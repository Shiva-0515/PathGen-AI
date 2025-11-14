import sys
import json
from rag_app.rag_core import generate_roadmap, populate_db_if_empty , setup_collection

# Setup ChromaDB collection
# and populate if empty

def get_collection():
    """Get the ChromaDB collection."""
    collection = setup_collection()
    if not collection:
        print("Failed to setup collection. Creating.")
        populate_db_if_empty(collection)
    return collection

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
