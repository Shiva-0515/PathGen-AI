from http.client import HTTPException
import json
import re
import os
import pandas as pd
import chromadb
from google import genai
from chromadb import Documents, EmbeddingFunction, Embeddings
from google.genai import types
from google.api_core import retry

# ----------------- Config -------------------
BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "chroma_db")
COLLECTION_NAME = "learning_paths"
CSV_PATH = os.path.join(BASE_DIR, "Data", "Technology_and_Computer_Science_Learning_Path_Dataset.csv")
GENAI_API_KEY = os.getenv("GENAI_API_KEY")

# ----------------- Google Gemini --------------
# genai.configure(api_key=GENAI_API_KEY)
client = genai.Client(api_key=GENAI_API_KEY)

class GeminiEmbeddingFunction(EmbeddingFunction):
    document_mode = True
    @retry.Retry(predicate=lambda e: isinstance(e, genai.errors.APIError) and e.code in {429, 503})
    def __call__(self, input: Documents) -> Embeddings:
        response = client.models.embed_content(
            model="models/text-embedding-004",
            contents=input,
            config=types.EmbedContentConfig(
                task_type="retrieval_document" if self.document_mode else "retrieval_query",
            ),
        )
        return [e.values for e in response.embeddings]

# ----------------- Chroma Setup --------------
def setup_collection():
    chroma_client = chromadb.PersistentClient(path=DB_PATH)
    collections = [col.name for col in chroma_client.list_collections()]
    if COLLECTION_NAME not in collections:
        print(f"📦 Creating new collection: {COLLECTION_NAME}")
        collection = chroma_client.create_collection(name=COLLECTION_NAME)
    else:
        print(f"📁 Using existing collection: {COLLECTION_NAME}")
        collection = chroma_client.get_collection(name=COLLECTION_NAME)
    return collection

# ----------------- Dataset Preparation -----------------
def load_documents():
    df = pd.read_csv(CSV_PATH)
    docs = []
    for _, row in df.iterrows():
        content = f"""Course: {row['Course']}\nTopics: {row['Topics']}\nLevel: {row['Level']}"""
        docs.append({
            "content": content,
            "metadata": {
                "course": row['Course'],
                "topics": row['Topics'],
                "level": row['Level']
            }
        })
    return docs

# ----------------- Insert to DB if Needed -----------------
# def populate_db_if_empty(collection):
#     if collection.count() == 0:
#         print("Inserting documents into ChromaDB...")
#         docs = load_documents()
#         batch_size = 100
#         for i in range(0, len(docs), batch_size):
#             batch = docs[i:i+batch_size]
#             collection.add(
#                 documents=[d["content"] for d in batch],
#                 metadatas=[d["metadata"] for d in batch],
#                 ids=[f"doc_{i + j}" for j in range(len(batch))]
#             )
#             print(f" Inserted batch {i}–{i+len(batch)-1}")
#         print("Done inserting documents.")
#     else:
#         print("ChromaDB already populated.")

def populate_db_if_empty(collection):
    if collection is None:
        print("⚠️ No Chroma collection. Skipping population.")
        return

    try:
        count = collection.count()
        print(f"📦 DB currently contains {count} items")
        if count == 0:
            print("📥 Populating database...")
            docs = load_documents()
            collection.add(
                documents=[d["content"] for d in docs],
                metadatas=[d["metadata"] for d in docs],
                ids=[f"doc_{i}" for i in range(len(docs))]
            )
            print("✅ DB population completed.")
    except Exception as e:
        print(f"❌ populate_db_if_empty error: {e}")


# ----------------- Prompt + Parsing -----------------

# def parse_daywise_roadmap(text):
#     roadmap = []

#     # Split into blocks based on "Day X:"
#     day_blocks = re.split(r"\bDay\s+(\d+):", text)

#     # Skip the first chunk (intro), then pair day numbers with blocks
#     i = 1
#     while i < len(day_blocks) - 1:
#         day_num = int(day_blocks[i].strip())
#         block = day_blocks[i + 1].strip()

#         # Try to extract Step and Description, even if formatting is messy
#         step_match = re.search(r"Step\s*:\s*(.+?)(?:\n|$)", block)
#         desc_match = re.search(r"Description\s*:\s*(.+?)(?:\n|$)", block, re.DOTALL)

#         roadmap.append({
#             "day": day_num,
#             "step": step_match.group(1).strip() if step_match else "Step not found",
#             "description": desc_match.group(1).strip() if desc_match else "Description not found"
#         })

#         i += 2  # Move to next day

#     return roadmap
import re

def parse_daywise_roadmap(text):
    roadmap = []

    # Split based on "Day X:"
    day_blocks = re.split(r"\bDay\s+(\d+):", text)

    i = 1
    while i < len(day_blocks) - 1:
        day_num = int(day_blocks[i].strip())
        block = day_blocks[i + 1].strip()

        # Extract Step
        step_match = re.search(r"Step\s*:\s*(.+?)(?:\n|$)", block)
        step_name = step_match.group(1).strip() if step_match else "Step not found"

        # Extract Concepts
        concepts_section = re.split(r"Concepts\s*:\s*", block)
        concept_list = []
        if len(concepts_section) > 1:
            concepts_block = concepts_section[1]
            concept_lines = re.findall(r"-\s*(.+?):\s*(.+?)(?=\n-|\Z)", concepts_block, re.DOTALL)
            for name, explanation in concept_lines:
                concept_list.append({
                    "name": name.strip(),
                    "description": explanation.strip()
                })

        roadmap.append({
            "day": day_num,
            "step": step_name,
            "concepts": concept_list
        })

        i += 2

    return roadmap

def format_prompt(user_query: str, context_chunks: list[str]) -> str:
    context = "\n\n".join(context_chunks)
    return f"""
You are an intelligent AI assistant specialized in generating personalized learning roadmaps.

## User Request:
{user_query}

## Relevant Learning Modules (Structured Format):
Steps:
Each step has:
- name: A high-level topic
- concepts: A list of subtopics with names

Example:
[
  {{
    "name": "Understand Basic Programming Concepts",
    "concepts": [
      {{ "name": "Variables and Data Types" }},
      {{ "name": "Control Structures (if statements, loops)" }}
    ]
  }},
  ...
]

## Task:
Generate a structured, day-wise learning roadmap based on the above steps and concepts, tailored to the user’s query.

### Output Format:
Day X:
Step: <Step name>
Concepts:
- <Concept 1 name>: <1–2 sentence explanation>
- <Concept 2 name>: <1–2 sentence explanation>
...

### Requirements:
- Use only relevant steps and concepts from the provided structure
- Keep the flow logical and progressive
- Match the user’s requested level and duration
- Keep it personalized and beginner-friendly if unspecified
- Avoid repetition
""".strip()

def build_query(course, level, duration):
    return f"Create a {duration}-day roadmap to learn {course} at {level.lower()} level"

# ----------------- Main Function -----------------
def generate_roadmap(course, level, duration, collection ,model="models/gemini-2.5-flash"):
    query = build_query(course, level, duration)
    # print(f" Querying for: {query}")

    results = collection.query(query_texts=[query], n_results=5)
    prompt = format_prompt(query, results["documents"][0])
    # print(f"Generated prompt:\n{prompt}\n")

    response = client.models.generate_content(model=model, contents=prompt)
    # response = client.generate_content(model=model, contents=prompt)

    roadmap = parse_daywise_roadmap(response.text)
    # print(response.text)
    print(roadmap)
    os.makedirs("outputs", exist_ok=True)

    filename = os.path.join("outputs",f"{course.strip().lower().replace(' ', '_')}_roadmap.json")
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(roadmap, f, indent=2, ensure_ascii=False)

    print(f"Roadmap saved to: {filename}")
    return roadmap

import models as EvaluateQuiz
def generate_quiz(language, level, model="models/gemini-2.5-flash"):
    query = f"Generate a quiz for {language} at {level} level"
    prompt = f"""You are an expert quiz generator. Create a quiz for the following request: 
            Request: {query}  
            The quiz should have 30 questions with 4 options each along with correct answer.
            Questions should cover a range of topics relevant to {language} at {level} level.
            Questions should be interview oriented and should test both theoretical knowledge and practical understanding.
            Format the output as a JSON array of objects, each with 'question', 'options', and 'answer' fields.
            Only return raw JSON. Do not include markdown fences or explanations.
            """.strip()
    
    response = client.models.generate_content(model=model, contents=prompt)
    # response = client.generate_content(model=model, contents=prompt)

    # Get raw model text
    model_output = response.candidates[0].content.parts[0].text

    # Remove markdown code fences like ```json ... ```
    clean_output = re.sub(r"^```(?:json)?|```$", "", model_output.strip(), flags=re.MULTILINE)

    try:
        quiz = json.loads(clean_output)
        return quiz
    except json.JSONDecodeError:
        print("Failed to parse quiz JSON. Response was:")
        print(model_output)
        return []
    
def evaluate_quiz(payload: EvaluateQuiz):
    correct_answers = []
    wrong_answers = []
    score = 0

    for item in payload.quiz:
        if item.selected_answer == item.correct_answer:
            score += 1
            correct_answers.append({
                "question": item.question,
                "userAnswer": item.selected_answer,
                "correctAnswer": item.correct_answer
            })
        else:
            wrong_answers.append({
                "question": item.question,
                "userAnswer": item.selected_answer,
                "correctAnswer": item.correct_answer
            })

    return {
        "score": score,
        "total": len(payload.quiz),
        "correctAnswers": correct_answers,
        "wrongAnswers": wrong_answers
    }


def generate_feedback(eval_data):
    prompt = f"""
    You are an expert tutor. The student answered a quiz.
    Here are their results:
    Score: {eval_data['score']} / {eval_data['total']}
    Correct Answers: {eval_data['correctAnswers']}
    Wrong Answers: {eval_data['wrongAnswers']}

        Analyze the student's strengths and weaknesses based on these answers.
    Provide:
    - pros: what the student is strong at
    - cons: what the student struggles with
    - suggestions: how to improve weak areas

    Return strictly JSON with keys: pros, cons, suggestions.
    """

    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents=prompt
    )
    model_output = response.candidates[0].content.parts[0].text
    clean_output = re.sub(r"^```(?:json)?|```$", "", model_output.strip(), flags=re.MULTILINE)
    try:
        feedback = json.loads(clean_output)
        return feedback
    except json.JSONDecodeError:
        print("Failed to parse feedback JSON. Response was:")
        print(model_output)
        return {"pros": [], "cons": [], "suggestions": []}