from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any
import json
import google.generativeai as genai
import os
import re
from typing import Dict, List, Any, Tuple, Union

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
            "cp-new": {
                "root": [
                    {
                        "id": "task-1",
                        "title": "Project Planning",
                        "content": "Outline key project milestones and deliverables.",
                        "position": {"x": 100, "y": 100},
                        "color": "bg-red-200",
                        "sector": "planning",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                    {
                        "id": "task-2",
                        "title": "Budgeting",
                        "content": "Allocate resources and track expenses for the project.",
                        "position": {"x": 400, "y": 100},
                        "color": "bg-blue-200",
                        "sector": "finance",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                ],
                "task-1": [
                    {
                        "id": "task-1-1",
                        "title": "Milestone 1",
                        "content": "Define the first major milestone.",
                        "position": {"x": 100, "y": 250},
                        "color": "bg-red-100",
                        "sector": "planning",
                        "selected": False,
                        "files": [],
                        "parentId": "task-1",
                        "zIndex": 1,
                    },
                    {
                        "id": "task-1-2",
                        "title": "Risk Assessment",
                        "content": "Identify and mitigate project risks.",
                        "position": {"x": 400, "y": 250},
                        "color": "bg-orange-100",
                        "sector": "planning",
                        "selected": False,
                        "files": [],
                        "parentId": "task-1",
                        "zIndex": 1,
                    },
                ],
            }
        }

        # Return the new structure instead of modifying the incoming one
        return new_canvas_hierarchy
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))