from fastapi import FastAPI
from pydantic import BaseModel
from rag_app.rag_core import generate_roadmap, generate_quiz, evaluate_quiz, generate_feedback
from rag_app.run_roadmap import get_collection
from rag_app.models import RoadmapRequest, QuizRequest , EvaluateQuiz
app = FastAPI()

# Setup the collection once when server starts
collection = get_collection()
class RoadmapRequest(BaseModel):
    course: str
    level: str
    duration: int
class QuizRequest(BaseModel):
    language: str
    level: str

@app.post("/generate-roadmap")
def generate(request: RoadmapRequest):
    roadmap = generate_roadmap(request.course, request.level, request.duration, collection)
    return {"roadmap": roadmap}

@app.post("/generate-quiz")
def generate_quiz_endpoint(request: QuizRequest):
    quiz = generate_quiz(request.language, request.level)
    return {"quiz": quiz}

@app.post("/evaluate-quiz")
async def evaluate_quiz_route(payload: EvaluateQuiz):
    base_eval = evaluate_quiz(payload)
    ai_eval = generate_feedback(base_eval)
    base_eval["aiEvaluation"] = ai_eval
    return base_eval

@app.get("/")
def read_root():
    return {"message": "Welcome to the RAG App API"}
