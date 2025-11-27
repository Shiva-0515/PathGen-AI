import sys
import json
from rag_core import generate_roadmap, populate_db_if_empty , setup_collection

# Setup ChromaDB collection
# and populate if empty

def get_collection():
    try:
        collection = setup_collection()
        if collection is None:
            print("❌ Failed to setup collection.")
            return None

        count = collection.count()
        print(f"📊 Current DB count: {count}")

        if count == 0:
            print("📝 Initializing database…")
            populate_db_if_empty(collection)

        return collection

    except Exception as e:
        print(f"❌ get_collection error: {e}")
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
