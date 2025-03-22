from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from models import StickyNote, StickyNoteTree

# Create an instance of the FastAPI class
app = FastAPI()
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
