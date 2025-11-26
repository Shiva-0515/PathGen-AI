import sys
import json
from rag_core import generate_roadmap, populate_db_if_empty , setup_collection

# Setup ChromaDB collection
# and populate if empty

def get_collection():
    try:
        collection = setup_collection()

        if collection is None:
            print("❌ setup_collection() returned None.")
            return None

        populate_db_if_empty(collection)
        return collection

    except Exception as e:
        print(f"❌ Error creating Chroma collection: {e}")
        return None

#  Accept user input
if __name__ == "__main__":
    collection = setup_collection()
    if not collection:
        print(" Failed to setup collection. Creating.")
        populate_db_if_empty(collection)
    course = input("Enter course: ")
    level = input("Enter level (Beginner/Intermediate/Advanced): ")
    duration = int(input("Duration (in days): "))
    roadmap = generate_roadmap(course, level, duration,collection)
    print(json.dumps(roadmap))
