from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from models import StickyNote, StickyNoteTree
from datetime import datetime
import time

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

class EditStickyNoteRequest(BaseModel):
    path: List[str]
    title: str
    description: str

class DeleteStickyNoteRequest(BaseModel):
    path: List[str]

class SpeechToTextRequest(BaseModel):
    text: str
class CanvasHierarchyModel(BaseModel):
    canvasHierarchy: Dict[str, Dict[str, List[Any]]]

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

@app.put("/api/edit-sticky")
def edit_sticky(data: EditStickyNoteRequest):
    """
    Edit an existing sticky note's title and description.
    The path parameter identifies which note to edit.
    """
    try:
        # Print the received data for debugging
        print(f"Edit request received: {data}")
        
        # Validate the path
        if not data.path:
            raise ValueError("Invalid path: empty path provided")
            
        # Traverse the tree to find the note
        current = tree.root
        
        # If path is empty or just contains one element (like ["root"]), we're editing a top-level note
        if len(data.path) <= 1:
            # We're editing a direct child of root
            title_to_edit = data.path[0] if data.path else None
            if title_to_edit and title_to_edit in current.children:
                note = current.children[title_to_edit]
                # Update the note
                old_title = note.title
                note.title = data.title
                note.description = data.description
                
                # If title changed, we need to update the key in the parent's children dict
                if old_title != data.title:
                    current.children[data.title] = note
                    del current.children[old_title]
                
                return {"message": "Sticky note updated successfully"}
            else:
                raise ValueError(f"Note '{title_to_edit}' not found")
        else:
            # We're editing a nested note
            # Navigate to the parent of the note to edit
            for i in range(len(data.path) - 1):
                level = data.path[i]
                if level in current.children:
                    current = current.children[level]
                else:
                    raise ValueError(f"Path '{level}' does not exist")
            
            # Now current is the parent of the note to edit
            title_to_edit = data.path[-1]
            if title_to_edit in current.children:
                note = current.children[title_to_edit]
                # Update the note
                old_title = note.title
                note.title = data.title
                note.description = data.description
                
                # If title changed, we need to update the key in the parent's children dict
                if old_title != data.title:
                    current.children[data.title] = note
                    del current.children[old_title]
                
                return {"message": "Sticky note updated successfully"}
            else:
                raise ValueError(f"Note '{title_to_edit}' not found")
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating sticky note: {str(e)}")

@app.delete("/api/delete-sticky")
def delete_sticky(data: DeleteStickyNoteRequest):
    """
    Delete a sticky note and all its children.
    The path parameter identifies which note to delete.
    """
    try:
        # Print the received data for debugging
        print(f"Delete request received: {data}")
        
        # Validate the path
        if not data.path:
            raise ValueError("Cannot delete root note")
            
        # Traverse the tree to find the parent of the note to delete
        current = tree.root
        
        # If path only contains one element, we're deleting a top-level note
        if len(data.path) == 1:
            title_to_delete = data.path[0]
            if title_to_delete in current.children:
                del current.children[title_to_delete]
                return {"message": "Sticky note deleted successfully"}
            else:
                raise ValueError(f"Note '{title_to_delete}' not found")
        else:
            # We're deleting a nested note
            # Navigate to the parent of the note to delete
            for i in range(len(data.path) - 1):
                level = data.path[i]
                if level in current.children:
                    current = current.children[level]
                else:
                    raise ValueError(f"Path '{level}' does not exist")
            
            # Now current is the parent of the note to delete
            title_to_delete = data.path[-1]
            if title_to_delete in current.children:
                del current.children[title_to_delete]
                return {"message": "Sticky note deleted successfully"}
            else:
                raise ValueError(f"Note '{title_to_delete}' not found")
    
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting sticky note: {str(e)}")

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
    
@app.post("/api/speech-to-text")
def process_speech_to_text(data: SpeechToTextRequest):
    """
    Process speech-to-text data and return analysis.
    This is a dummy endpoint that simulates processing time and returns mock data.
    """
    try:
        # Print the received data for debugging
        print(f"Speech-to-text request received: {data.text}")
        
        # Simulate processing time
        time.sleep(1)
        
        # Mock analysis results
        word_count = len(data.text.split())
        
        return {
            "status": "success",
            "timestamp": datetime.now().isoformat(),
            "data": {
                "receivedText": data.text,
                "wordCount": word_count,
                "analysis": {
                    "sentiment": "positive",
                    "keyTopics": ["productivity", "organization", "planning"],
                    "suggestedActions": [
                        "Create a sticky note for each key topic",
                        "Organize topics into a hierarchy",
                        "Set deadlines for action items"
                    ]
                }
            }
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing speech-to-text: {str(e)}")


class BusinessInfo(BaseModel):
    businessInfo: str
class BusinessInfo(BaseModel):
    businessInfo: str

@app.post("/api/analyze-business")
async def analyze_business(data: BusinessInfo):
    try:
        return {"message": f"{data.businessInfo.upper()} hair balls"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CanvasHierarchyModel(BaseModel):
    canvasHierarchy: Dict[str, Dict[str, List[Any]]]

@app.post("/api/updateCanvas")
async def update_canvas(data: CanvasHierarchyModel):
    try:
        # Define the new hierarchy structure
        new_canvas_hierarchy = {
  "cp-1": {
    "root": [
      {
        "id": "note-1",
        "title": "Inventory",
        "content": "Track and manage your inventory levels, suppliers, and procurement processes.",
        "position": { "x": 100, "y": 100 },
        "color": "bg-yellow-200",
        "sector": "inventory",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      },
      {
        "id": "note-2",
        "title": "Manufacturing",
        "content": "Monitor production processes, quality control, and operational efficiency.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-blue-200",
        "sector": "manufacturing",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      },
      {
        "id": "note-3",
        "title": "Product Strategy",
        "content": "Plan product roadmaps, feature development, and market positioning.",
        "position": { "x": 100, "y": 350 },
        "color": "bg-green-200",
        "sector": "product",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      },
      {
        "id": "note-4",
        "title": "Human Operations",
        "content": "Manage recruitment, training, performance, and employee engagement.",
        "position": { "x": 400, "y": 350 },
        "color": "bg-purple-200",
        "sector": "human",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      },
      {
        "id": "note-5",
        "title": "please please please",
        "content": "sabrina carpenter",
        "position": { "x": 800, "y": 350 },
        "color": "bg-purple-200",
        "sector": "music",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      }
    ],
    "note-1": [
      {
        "id": "note-1-1",
        "title": "Suppliers",
        "content": "List of key suppliers and contact information.",
        "position": { "x": 100, "y": 100 },
        "color": "bg-yellow-100",
        "sector": "inventory",
        "selected": False,
        "files": [],
        "parentId": "note-1",
        "zIndex": 1
      },
      {
        "id": "note-1-2",
        "title": "Stock Levels",
        "content": "Current inventory levels and reorder points.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-yellow-100",
        "sector": "inventory",
        "selected": False,
        "files": [],
        "parentId": "note-1",
        "zIndex": 1
      }
    ],
    "note-5": [
      {
        "id": "note-1-1",
        "title": "Suppliers",
        "content": "List of key suppliers and contact information.",
        "position": { "x": 100, "y": 100 },
        "color": "bg-yellow-100",
        "sector": "inventory",
        "selected": False,
        "files": [],
        "parentId": "note-1",
        "zIndex": 1
      },
      {
        "id": "note-1-2",
        "title": "Stock Levels",
        "content": "Current inventory levels and reorder points.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-yellow-100",
        "sector": "inventory",
        "selected": False,
        "files": [],
        "parentId": "note-1",
        "zIndex": 1
      }
    ]
  },
  "cp-2": {
    "root": [
      {
        "id": "note-5",
        "title": "Inventory",
        "content": "Updated inventory management system implemented.",
        "position": { "x": 100, "y": 100 },
        "color": "bg-yellow-200",
        "sector": "inventory",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      },
      {
        "id": "note-6",
        "title": "Manufacturing",
        "content": "New production line added, increasing capacity by 30%.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-blue-200",
        "sector": "manufacturing",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      }
    ]
  },
  "cp-3": {
    "root": [
      {
        "id": "note-7",
        "title": "Product Strategy",
        "content": "New product line launched, targeting enterprise customers.",
        "position": { "x": 100, "y": 100 },
        "color": "bg-green-200",
        "sector": "product",
        "selected": False,
        "files": [],
        "parentId": None,
        "zIndex": 1
      }
    ]
  }
}



        # Return the new structure instead of modifying the incoming one
        return new_canvas_hierarchy
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))