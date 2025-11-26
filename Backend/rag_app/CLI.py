import sys
import json
from rag_core import generate_roadmap, populate_db_if_empty , setup_collection

# Setup ChromaDB collection
# and populate if empty
# prevent re-insertions
collection = setup_collection()
if not collection:
    print("Failed to setup collection. Creating.")
    populate_db_if_empty(collection)

# Accept CLI arguments and user input
if __name__ == "__main__":

    course = sys.argv[1]
    level = sys.argv[2]
    duration = int(sys.argv[3]) 
    collection = setup_collection()
    if not collection:
        print("Failed to setup collection. Exiting.")
        sys.exit(1)
    roadmap = generate_roadmap(course, level, duration,collection)
    print(json.dumps(roadmap, ensure_ascii=False))

