from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from models import StickyNote, StickyNoteTree
from datetime import datetime

# Create an instance of the FastAPI class
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tree = StickyNoteTree()

class StickyNoteRequest(BaseModel):
    path: List[str]
    sticky: dict
# Define a root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Define another endpoint with a path parameter
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/api/add-sticky")
def add_sticky(data: StickyNoteRequest):
    try:
        tree.traverse_and_add(data.path, data.sticky["title"], data.sticky["description"])
        return {"message": "Sticky note added successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/sticky-tree")
def get_sticky_tree():
    """
    Returns all sticky notes in a tree format.
    """
    try:
        # Convert the tree to a dictionary format for JSON response
        tree_data = tree.to_dict()
        
        return {
            "status": "success",
            "timestamp": datetime.now().isoformat(),
            "data": tree_data
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving sticky tree: {str(e)}")
