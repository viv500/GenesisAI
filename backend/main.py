import json
import google.generativeai as genai
import os
import re
import uuid
from typing import Dict, List, Any, Tuple, Union
from dotenv import load_dotenv

# Add this to the imports section at the top of the file
from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional, Union, Set

load_dotenv()

class HierarchicalDataManager:
    def __init__(self, gemini_api_key: str, initial_knowledge_base: Dict[str, Any] = None):
        """
        Initialize the Hierarchical Data Manager with Gemini API integration.
        
        Args:
            gemini_api_key: Your Google Gemini API key
            initial_knowledge_base: Optional custom knowledge base to start with
        """
        genai.configure(api_key=gemini_api_key)
        
        # Updated model selection logic - trying newer models first
        try:
            # First try to list available models
            available_models = genai.list_models()
            self.model = None
            
            # Look for newer Gemini models first (1.5 flash, pro, etc.)
            preferred_models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"]
            
            for preferred in preferred_models:
                for model in available_models:
                    if preferred in model.name and 'generateContent' in model.supported_generation_methods:
                        self.model = genai.GenerativeModel(model.name)
                        print(f"Using model: {model.name}")
                        break
                if self.model:
                    break
            
            # If no preferred models found, just use the first available text model
            if not self.model:
                for model in available_models:
                    if 'generateContent' in model.supported_generation_methods:
                        self.model = genai.GenerativeModel(model.name)
                        print(f"Using available model: {model.name}")
                        break
        except Exception as e:
            print(f"Error listing models: {str(e)}")
            
        # Fallback to latest known model if we couldn't get or find any models
        if self.model is None:
            self.model = genai.GenerativeModel('gemini-1.5-flash')
            print("Using fallback model: gemini-1.5-flash")
        
        # Set default colors for sectors
        self.sector_colors = {
            "inventory": "bg-yellow-200",
            "manufacturing": "bg-blue-200",
            "product": "bg-green-200",
            "human": "bg-purple-200",
            "shipping": "bg-red-200",
            "quality": "bg-teal-200",
            "production": "bg-indigo-200",
            "music": "bg-purple-200"  # Added based on second file
        }
        
        # Initialize with the custom knowledge base if provided, otherwise use default structure
        if initial_knowledge_base:
            self.knowledge_base = initial_knowledge_base
        else:
            # Initialize with new format matching the second file
            self.knowledge_base = {
                "cp-1": {
                    "root": [
                        self._create_note("Inventory", "Track and manage your inventory levels, suppliers, and procurement processes.", 100, 100, "inventory"),
                        self._create_note("Manufacturing", "Monitor production processes, quality control, and operational efficiency.", 400, 100, "manufacturing"),
                        self._create_note("Product Strategy", "Plan product roadmaps, feature development, and market positioning.", 100, 350, "product"),
                        self._create_note("Human Operations", "Manage recruitment, training, performance, and employee engagement.", 400, 350, "human")
                    ]
                }
            }
            
            # Add children to Inventory as an example
            inventory_id = self.knowledge_base["cp-1"]["root"][0]["id"]
            self.knowledge_base["cp-1"][inventory_id] = [
                self._create_note("Suppliers", "List of key suppliers and contact information.", 100, 100, "inventory", inventory_id),
                self._create_note("Stock Levels", "Current inventory levels and reorder points.", 400, 100, "inventory", inventory_id)
            ]
        
        # Track the latest checkpoint - but only consider cp-1 as requested
        self.current_checkpoint = "cp-1"
    
    def _get_latest_checkpoint(self) -> str:
        """Get the latest checkpoint ID from the knowledge base"""
        # As per requirement, we only consider cp-1
        return "cp-1"
    
    def _create_note(self, title: str, content: str, x: int, y: int, sector: str, 
                     parent_id: str = None, selected: bool = False) -> Dict[str, Any]:
        """
        Create a note with the specified properties.
        
        Args:
            title: The title of the note
            content: The content/description of the note
            x: X position
            y: Y position
            sector: Sector category (inventory, manufacturing, etc.)
            parent_id: ID of the parent note (None for root level)
            selected: Whether the note is selected
            
        Returns:
            Dict representing the note
        """
        # Generate unique ID based on parent and title
        if parent_id:
            # Count existing siblings to determine index
            siblings = self._get_children_of_note(parent_id)
            note_id = f"{parent_id}-{len(siblings) + 1}"
        else:
            # For root level notes
            root_notes = self.knowledge_base.get(self.current_checkpoint, {}).get("root", [])
            note_id = f"note-{len(root_notes) + 1}"
        
        # Get color based on sector
        color = self.sector_colors.get(sector, "bg-gray-200")
        
        # Match the format in the second file (True/False not lowercase)
        return {
            "id": note_id,
            "title": title,
            "content": content,
            "position": {"x": x, "y": y},
            "color": color,
            "sector": sector,
            "selected": selected,
            "files": [],
            "parentId": parent_id,
            "zIndex": 1
        }
    
    def _get_children_of_note(self, note_id: str) -> List[Dict[str, Any]]:
        """Get children notes of a specific note"""
        return self.knowledge_base.get(self.current_checkpoint, {}).get(note_id, [])
    
    def create_checkpoint(self) -> Dict[str, Any]:
        """
        Create a new checkpoint based on the current state.
        Note: As per requirement, only cp-1 is considered
        
        Returns:
            Dict containing the result of the operation
        """
        # We're only considering cp-1, so just return a message
        return {
            "success": False,
            "message": "Only cp-1 is considered in this version"
        }
    
    def find_note(self, note_id: str) -> Tuple[Dict[str, Any], str, bool]:
        """
        Find a note in the knowledge base by its ID.
        
        Args:
            note_id: The ID of the note to find
            
        Returns:
            Tuple containing:
            - The note if found, otherwise None
            - The parent ID or 'root'
            - Boolean indicating if note was found
        """
        # Check all levels in current checkpoint
        for parent_id, notes in self.knowledge_base[self.current_checkpoint].items():
            for note in notes:
                if note["id"] == note_id:
                    return note, parent_id, True
        
        return None, None, False
    
    def find_notes_by_title(self, title: str) -> List[Tuple[Dict[str, Any], str]]:
        """
        Find notes by title across the knowledge base.
        
        Args:
            title: The title to search for
            
        Returns:
            List of tuples containing (note, parent_id)
        """
        results = []
        
        # Check all levels in current checkpoint
        for parent_id, notes in self.knowledge_base[self.current_checkpoint].items():
            for note in notes:
                if note["title"].lower() == title.lower():
                    results.append((note, parent_id))
        
        return results
    
    def get_selected_notes(self) -> List[Dict[str, Any]]:
        """
        Get all notes that are currently selected.
        
        Returns:
            List of selected notes
        """
        selected_notes = []
        
        # Check all levels in current checkpoint
        for parent_id, notes in self.knowledge_base[self.current_checkpoint].items():
            for note in notes:
                if note.get("selected", False):
                    selected_notes.append(note)
        
        return selected_notes
    
    def process_information(self, information: str) -> Dict[str, Any]:
        """
        Process information and update the knowledge base according to selected notes.
        
        Args:
            information: The information to process
            
        Returns:
            Dict containing the result of the operation
        """
        # Get selected notes
        selected_notes = self.get_selected_notes()
        
        if not selected_notes:
            return {
                "success": False,
                "message": "No notes are selected. Please select at least one note."
            }
        
        # Process for each selected note
        results = []
        for note in selected_notes:
            result = self.process_for_note(note["id"], information)
            results.append(result)
        
        # Summarize results
        success = all(r["success"] for r in results)
        
        return {
            "success": success,
            "message": f"Processed information for {len(results)} selected notes",
            "details": results
        }
    
    def process_for_note(self, note_id: str, information: str) -> Dict[str, Any]:
        """
        Process information for a specific note.
        
        Args:
            note_id: The ID of the note to update
            information: The information to process
            
        Returns:
            Dict containing the result of the operation
        """
        # Check if this is a removal request
        if "remove" in information.lower():
            return self.process_removal(note_id, information)
        
        # Find the target note
        target_note, parent_id, found = self.find_note(note_id)
        
        if not found:
            return {
                "success": False,
                "message": f"Note with ID '{note_id}' does not exist."
            }
        
        # Analyze the information and create/update child notes
        return self.analyze_and_create_notes(target_note, information)
    
    def process_removal(self, note_id: str, information: str) -> Dict[str, Any]:
        """
        Process a request to remove information.
        
        Args:
            note_id: The ID of the note to update
            information: The information about what to remove
            
        Returns:
            Dict containing the result of the operation
        """
        # Find the target note
        target_note, parent_id, found = self.find_note(note_id)
        
        if not found:
            return {
                "success": False,
                "message": f"Note with ID '{note_id}' does not exist."
            }
        
        # Parse the removal request using Gemini
        prompt = f"""
        I need to understand exactly what needs to be removed from the {target_note['title']} note.
        
        Request: "{information}"
        
        Please analyze this request and identify:
        1. The exact item to be removed (e.g., country name, method, etc.)
        2. What type of item it is (e.g., country, shipping method, etc.)
        
        Format your response exactly like this:
        Item: [the exact item name to remove]
        Type: [the type of item]
        """
        
        try:
            response = self.model.generate_content(prompt)
            analysis_text = response.text
        except AttributeError:
            # Alternative approach if the API has changed 
            try:
                response = self.model.generate_content(prompt)
                analysis_text = response.candidates[0].content.parts[0].text
            except Exception as e:
                return {
                    "success": False,
                    "message": f"API Error: {str(e)}"
                }
        
        # Parse Gemini's response
        item_match = re.search(r"Item:\s*(.*?)(?:\n|$)", analysis_text)
        type_match = re.search(r"Type:\s*(.*?)(?:\n|$)", analysis_text)
        
        item_to_remove = item_match.group(1).strip() if item_match else None
        item_type = type_match.group(1).strip() if type_match else None
        
        if not item_to_remove:
            return {
                "success": False,
                "message": "Could not determine what to remove."
            }
        
        # Search for the item to remove among children of the target note
        return self.remove_item_from_note(note_id, item_to_remove)
    
    def remove_item_from_note(self, parent_id: str, item_to_remove: str) -> Dict[str, Any]:
        """
        Remove a child note based on its title.
        
        Args:
            parent_id: The parent note ID
            item_to_remove: The title of the item to remove
            
        Returns:
            Dict containing the result of the operation
        """
        # Get children of the note
        if parent_id not in self.knowledge_base[self.current_checkpoint]:
            return {
                "success": False,
                "message": f"Note with ID '{parent_id}' has no child notes."
            }
        
        children = self.knowledge_base[self.current_checkpoint][parent_id]
        removed = False
        
        # Look for matching title
        for i, child in enumerate(children):
            if child["title"].lower() == item_to_remove.lower():
                # Remove the child
                removed_child = children.pop(i)
                
                # If the removed child had children, remove them too
                child_id = removed_child["id"]
                if child_id in self.knowledge_base[self.current_checkpoint]:
                    del self.knowledge_base[self.current_checkpoint][child_id]
                
                removed = True
                break
        
        if not removed:
            return {
                "success": False,
                "message": f"Could not find '{item_to_remove}' to remove."
            }
        
        return {
            "success": True,
            "message": f"Removed '{item_to_remove}' successfully."
        }
    
    def analyze_and_create_notes(self, parent_note: Dict[str, Any], information: str) -> Dict[str, Any]:
        """
        Analyze information using Gemini and create child notes.
        
        Args:
            parent_note: The parent note
            information: Information to process
            
        Returns:
            Dict containing the result of the operation
        """
        parent_id = parent_note["id"]
        
        # Generate prompt for Gemini to extract entities
        prompt = f"""
        I need to organize this information into notes under '{parent_note['title']}':
        
        "{information}"
        
        Current context: {parent_note['title']} - {parent_note['content']}
        
        Task: Identify entities mentioned in this information that should become child notes under '{parent_note['title']}'.
        For each entity:
        1. Provide a clear title
        2. Provide a brief description
        3. Identify the sector it belongs to (inventory, manufacturing, product, human, shipping, quality, production, music)
        
        Format your response exactly like this:
        Entities:
        - Title: [Entity Title] | Description: [Description of Entity] | Sector: [inventory/manufacturing/product/human/shipping/quality/production/music]
        - Title: [Entity Title] | Description: [Description of Entity] | Sector: [inventory/manufacturing/product/human/shipping/quality/production/music]
        ...
        
        IMPORTANT: Only extract entities that are explicitly mentioned in the input text.
        """
        
        try:
            response = self.model.generate_content(prompt)
            analysis_text = response.text
        except AttributeError:
            try:
                response = self.model.generate_content(prompt)
                analysis_text = response.candidates[0].content.parts[0].text
            except Exception as e:
                # Fallback to a simpler approach
                return self.simple_information_processing(parent_note, information)
        
        # Parse Gemini's response to extract entities
        entities_section = re.search(r"Entities:(.*?)$", analysis_text, re.DOTALL)
        if not entities_section:
            return self.simple_information_processing(parent_note, information)
        
        entities_text = entities_section.group(1).strip()
        entity_matches = re.findall(r"- Title:\s*(.*?)\s*\|\s*Description:\s*(.*?)\s*\|\s*Sector:\s*(.*?)(?:\n|$)", entities_text, re.DOTALL)
        
        if not entity_matches:
            return self.simple_information_processing(parent_note, information)
        
        # Initialize parent's children list if it doesn't exist
        if parent_id not in self.knowledge_base[self.current_checkpoint]:
            self.knowledge_base[self.current_checkpoint][parent_id] = []
        
        # Process each entity
        updates_made = []
        for entity_title, entity_desc, entity_sector in entity_matches:
            entity_title = entity_title.strip()
            entity_desc = entity_desc.strip()
            entity_sector = entity_sector.strip().lower()
            
            # Validate sector
            if entity_sector not in self.sector_colors:
                entity_sector = parent_note["sector"]
            
            # Check if entity already exists as a child
            existing_entity = None
            for child in self.knowledge_base[self.current_checkpoint][parent_id]:
                if child["title"].lower() == entity_title.lower():
                    existing_entity = child
                    break
            
            # Calculate position for new notes (staggered grid layout)
            children = self.knowledge_base[self.current_checkpoint][parent_id]
            x_pos = 100 + ((len(children) % 3) * 300)
            y_pos = 100 + ((len(children) // 3) * 250)
            
            if existing_entity:
                # Update existing entity
                existing_entity["content"] = entity_desc
                existing_entity["sector"] = entity_sector
                existing_entity["color"] = self.sector_colors.get(entity_sector, "bg-gray-200")
                updates_made.append(entity_title + " (updated)")
            else:
                # Create new entity
                new_note = self._create_note(
                    entity_title, 
                    entity_desc, 
                    x_pos, 
                    y_pos, 
                    entity_sector, 
                    parent_id
                )
                self.knowledge_base[self.current_checkpoint][parent_id].append(new_note)
                updates_made.append(entity_title + " (new)")
        
        return {
            "success": True,
            "message": f"Updated {parent_note['title']} with new information",
            "updates": updates_made
        }
    
    def generate_feedback(self): 
        """
        Generate thought-provoking feedback about the current business plan using Gemini AI.
        
        Returns:
            Dict[str, Any]: A dictionary containing the feedback message or error details
        """
        if not self.model:
            return {"message": "Error occurred", "error": "Gemini model not initialized"}
            
        prompt = f"""
            You are a seasoned business strategist AI analyzing our venture's foundational elements. 
            Carefully examine the core components from our planning notes below:

            {self.knowledge_base}

            Identify the most significant opportunity to create connective tissue between these operational areas: 
            - Inventory/Supply Chain (including suppliers and stock levels)
            - Manufacturing/Production Capacity
            - Product Development Roadmap
            - Human Operations/Talent Strategy
            - Sustainability Integration (from later checkpoints)

            Generate one piercing question that exposes either:
            1) A critical gap in cross-departmental synergy, or 
            2) An untapped leverage point between operational units, or
            3) A sustainability optimization not fully capitalized

            Focus specifically on how improvements in one area could amplify results in others. Phrase your question to provoke strategic reevaluation rather than incremental tweaks. 
            Output only the question itself, without any formatting or commentary.
        """
        
        try: 
            # Set safety settings if needed
            # safety_settings = [
            #    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            # ]
            
            # Make the API call to Gemini
            response = self.model.generate_content(prompt)
            
            # Check if response has text attribute
            if hasattr(response, 'text'):
                feedback = response.text
                print(f"Successfully generated feedback: {feedback[:100]}...")
                return {"message": feedback, "status": "success"}
            else:
                print(f"Unexpected response format: {response}")
                return {"message": "Error occurred", "error": "Unexpected response format"}
                
        except Exception as e: 
            print(f"Error generating feedback: {str(e)}")
            return {"message": "Error occurred", "error": str(e)}


    def simple_information_processing(self, parent_note: Dict[str, Any], information: str) -> Dict[str, Any]:
        """
        Simple fallback method for processing information.
        
        Args:
            parent_note: The parent note
            information: Information to process
            
        Returns:
            Dict containing the result of the operation
        """
        parent_id = parent_note["id"]
        
        # Try to extract key points
        prompt = f"""
        Extract 2-3 key points from this information that should be added under '{parent_note['title']}':
        
        "{information}"
        
        Format each key point as:
        Title: [short title]
        Description: [brief description]
        
        Use ONLY information that is explicitly mentioned in the text.
        """
        
        try:
            response = self.model.generate_content(prompt)
            points_text = response.text
        except:
            # Create a generic "Information" note
            info_title = "Information"
            info_content = information[:150] + "..." if len(information) > 150 else information
            
            # Initialize parent's children list if it doesn't exist
            if parent_id not in self.knowledge_base[self.current_checkpoint]:
                self.knowledge_base[self.current_checkpoint][parent_id] = []
            
            # Check if Information note already exists
            existing_info = None
            for child in self.knowledge_base[self.current_checkpoint][parent_id]:
                if child["title"].lower() == info_title.lower():
                    existing_info = child
                    break
            
            # Calculate position for new note
            children = self.knowledge_base[self.current_checkpoint][parent_id]
            x_pos = 100 + ((len(children) % 3) * 300)
            y_pos = 100 + ((len(children) // 3) * 250)
            
            if existing_info:
                # Update existing Information note
                existing_info["content"] = existing_info["content"] + " " + info_content
            else:
                # Create new Information note
                new_note = self._create_note(
                    info_title, 
                    info_content, 
                    x_pos, 
                    y_pos, 
                    parent_note["sector"], 
                    parent_id
                )
                self.knowledge_base[self.current_checkpoint][parent_id].append(new_note)
            
            return {
                "success": True,
                "message": f"Added generic information to {parent_note['title']}",
                "node": info_title
            }
        
        # Parse key points
        point_matches = re.findall(r"Title:\s*(.*?)(?:\n|$).*?Description:\s*(.*?)(?:\n\n|$)", points_text, re.DOTALL)
        
        if not point_matches:
            # Create a "Details" note
            details_title = "Details"
            details_content = information[:150] + "..." if len(information) > 150 else information
            
            # Initialize parent's children list if it doesn't exist
            if parent_id not in self.knowledge_base[self.current_checkpoint]:
                self.knowledge_base[self.current_checkpoint][parent_id] = []
            
            # Check if Details note already exists
            existing_details = None
            for child in self.knowledge_base[self.current_checkpoint][parent_id]:
                if child["title"].lower() == details_title.lower():
                    existing_details = child
                    break
            
            # Calculate position for new note
            children = self.knowledge_base[self.current_checkpoint][parent_id]
            x_pos = 100 + ((len(children) % 3) * 300)
            y_pos = 100 + ((len(children) // 3) * 250)
            
            if existing_details:
                # Update existing Details note
                existing_details["content"] = existing_details["content"] + " " + details_content
            else:
                # Create new Details note
                new_note = self._create_note(
                    details_title, 
                    details_content, 
                    x_pos, 
                    y_pos, 
                    parent_note["sector"], 
                    parent_id
                )
                self.knowledge_base[self.current_checkpoint][parent_id].append(new_note)
            
            return {
                "success": True,
                "message": f"Added details to {parent_note['title']}",
                "node": details_title
            }
        
        # Initialize parent's children list if it doesn't exist
        if parent_id not in self.knowledge_base[self.current_checkpoint]:
            self.knowledge_base[self.current_checkpoint][parent_id] = []
        
        # Add each key point as a note
        points_added = []
        for title, desc in point_matches:
            title = title.strip()
            desc = desc.strip()
            
            # Check if note with this title already exists
            existing_note = None
            for child in self.knowledge_base[self.current_checkpoint][parent_id]:
                if child["title"].lower() == title.lower():
                    existing_note = child
                    break
            
            # Calculate position for new note
            children = self.knowledge_base[self.current_checkpoint][parent_id]
            x_pos = 100 + ((len(children) % 3) * 300)
            y_pos = 100 + ((len(children) // 3) * 250)
            
            if existing_note:
                # Update existing node
                existing_note["content"] = desc
                points_added.append(title + " (updated)")
            else:
                # Create new node
                new_note = self._create_note(
                    title, 
                    desc, 
                    x_pos, 
                    y_pos, 
                    parent_note["sector"], 
                    parent_id
                )
                self.knowledge_base[self.current_checkpoint][parent_id].append(new_note)
                points_added.append(title + " (new)")
        
        return {
            "success": True,
            "message": f"Added information to {parent_note['title']}",
            "points_added": points_added
        }
    
    def select_note(self, note_id: str, select: bool = True) -> Dict[str, Any]:
        """
        Select or deselect a note.
        
        Args:
            note_id: The ID of the note
            select: Whether to select or deselect the note
            
        Returns:
            Dict containing the result of the operation
        """
        note, parent_id, found = self.find_note(note_id)
        
        if not found:
            return {
                "success": False,
                "message": f"Note with ID '{note_id}' does not exist."
            }
        
        # Update selected value - make sure it's True or False, not true or false
        note["selected"] = True if select else False
        
        return {
            "success": True,
            "message": f"{'Selected' if select else 'Deselected'} note '{note['title']}'"
        }
    
    def get_knowledge_base(self) -> Dict[str, Any]:
        """
        Get the current knowledge base.
        
        Returns:
            The complete knowledge base
        """
        return self.knowledge_base
    
    def get_current_checkpoint(self) -> Dict[str, Any]:
        """
        Get the current checkpoint data.
        
        Returns:
            The current checkpoint data
        """
        return self.knowledge_base[self.current_checkpoint]
    
    def save_to_file(self, filename: str) -> Dict[str, Any]:
        """
        Save the knowledge base to a JSON file.
        
        Args:
            filename: Path to save the file
            
        Returns:
            Dict containing the result of the operation
        """
        try:
            with open(filename, 'w') as f:
                json.dump(self.knowledge_base, f, indent=4)
            
            return {
                "success": True,
                "message": f"Knowledge base saved to {filename}"
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error saving data: {str(e)}"
            }
    
    def load_from_file(self, filename: str) -> Dict[str, Any]:
        """
        Load the knowledge base from a JSON file.
        
        Args:
            filename: Path to the file
            
        Returns:
            Dict containing the result of the operation
        """
        try:
            with open(filename, 'r') as f:
                self.knowledge_base = json.load(f)
            
            # As per requirement, only use cp-1
            self.current_checkpoint = "cp-1"
            
            # Convert boolean values from lowercase to uppercase if needed
            self._normalize_boolean_values()
            
            return {
                "success": True,
                "message": f"Knowledge base loaded from {filename}"
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error loading data: {str(e)}"
            }
    
    def _normalize_boolean_values(self):
        """
        Normalize boolean values to be True/False instead of true/false
        """
        # Process all notes in the knowledge base
        for checkpoint, data in self.knowledge_base.items():
            for parent_id, notes in data.items():
                for note in notes:
                    # Convert 'selected' to proper Python boolean if it's a string
                    if isinstance(note.get("selected"), str) or False:
                        note["selected"] = note["selected"].lower() == "true"
                    # Make sure None is converted to False
                    if note.get("selected") is None:
                        note["selected"] = False
                    # Convert parentId None string to actual None
                    if isinstance(note.get("parentId"), str) and note["parentId"].lower() == "none":
                        note["parentId"] = None

    




from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from models import StickyNote, StickyNoteTree
import json
import google.generativeai as genai
import os
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

@app.post("/api/analyze-business")
async def analyze_business(data: BusinessInfo):
    try:
        return {"message": f"{data.businessInfo.upper()}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
                        "position": {"x": 100, "y": 100},
                        "color": "bg-yellow-200",
                        "sector": "inventory",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                    {
                        "id": "note-2",
                        "title": "Manufacturing",
                        "content": "Monitor production processes, quality control, and operational efficiency.",
                        "position": {"x": 400, "y": 100},
                        "color": "bg-blue-200",
                        "sector": "manufacturing",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                    {
                        "id": "note-3",
                        "title": "Product Strategy",
                        "content": "Plan product roadmaps, feature development, and market positioning.",
                        "position": {"x": 100, "y": 350},
                        "color": "bg-green-200",
                        "sector": "product",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                    {
                        "id": "note-4",
                        "title": "Human Operations",
                        "content": "Manage recruitment, training, performance, and employee engagement.",
                        "position": {"x": 400, "y": 350},
                        "color": "bg-purple-200",
                        "sector": "human",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                    {
                        "id": "note-5",
                        "title": "please please please",
                        "content": "sabrina carpenter",
                        "position": {"x": 800, "y": 350},
                        "color": "bg-purple-200",
                        "sector": "music",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    }
                ],
                "note-1": [
                    {
                        "id": "note-1-1",
                        "title": "Suppliers",
                        "content": "List of key suppliers and contact information.",
                        "position": {"x": 100, "y": 100},
                        "color": "bg-yellow-100",
                        "sector": "inventory",
                        "selected": False,
                        "files": [],
                        "parentId": "note-1",
                        "zIndex": 1,
                    },
                    {
                        "id": "note-1-2",
                        "title": "Stock Levels",
                        "content": "Current inventory levels and reorder points.",
                        "position": {"x": 400, "y": 100},
                        "color": "bg-yellow-100",
                        "sector": "inventory",
                        "selected": False,
                        "files": [],
                        "parentId": "note-1",
                        "zIndex": 1,
                    }
                ],
                "note-5": [
                    {
                        "id": "note-1-1",
                        "title": "Suppliers",
                        "content": "List of key suppliers and contact information.",
                        "position": {"x": 100, "y": 100},
                        "color": "bg-yellow-100",
                        "sector": "inventory",
                        "selected": False,
                        "files": [],
                        "parentId": "note-1",
                        "zIndex": 1,
                    },
                    {
                        "id": "note-1-2",
                        "title": "Stock Levels",
                        "content": "Current inventory levels and reorder points.",
                        "position": {"x": 400, "y": 100},
                        "color": "bg-yellow-100",
                        "sector": "inventory",
                        "selected": False,
                        "files": [],
                        "parentId": "note-1",
                        "zIndex": 1,
                    }
                ]
            },
            "cp-2": {
                "root": [
                    {
                        "id": "note-5",
                        "title": "Inventory",
                        "content": "Updated inventory management system implemented.",
                        "position": {"x": 100, "y": 100},
                        "color": "bg-yellow-200",
                        "sector": "inventory",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    },
                    {
                        "id": "note-6",
                        "title": "Manufacturing",
                        "content": "New production line added, increasing capacity by 30%.",
                        "position": {"x": 400, "y": 100},
                        "color": "bg-blue-200",
                        "sector": "manufacturing",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    }
                ]
            },
            "cp-3": {
                "root": [
                    {
                        "id": "note-7",
                        "title": "Product Strategy",
                        "content": "New product line launched, targeting enterprise customers.",
                        "position": {"x": 100, "y": 100},
                        "color": "bg-green-200",
                        "sector": "product",
                        "selected": False,
                        "files": [],
                        "parentId": None,
                        "zIndex": 1,
                    }
                ]
            }
        }
        # Return the new structure instead of modifying the incoming one
        return new_canvas_hierarchy
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# NEW: Endpoint to update canvas hierarchy based on a user question
class UpdateHierarchyRequest(BaseModel):
    question: str  # Changed from 'question' to match frontend
    canvasHierarchy: Dict[str, Dict[str, List[Dict]]]  # More specific typing

# Configure Gemini
#model = genai.GenerativeModel('gemini-1.5-pro')



@app.post("/api/update-hierarchy")
async def update_hierarchy(data: UpdateHierarchyRequest):
    #OPEN JASON FILE HERE
    manager = HierarchicalDataManager(os.getenv("GEMINI_API_KEY"), data.canvasHierarchy)

    #ENTER PROMPT HERE
    result = manager.process_information(data.question)
    #Create a new checkpoint (version)
    manager.create_checkpoint()
    current_data = manager.get_current_checkpoint()
    print(manager.get_knowledge_base())

    return manager.get_knowledge_base()

# Add this new model class for the updated feedback endpoint
class UpdatedNoteModel(BaseModel):
    canvasHierarchy: Dict[str, Dict[str, List[Any]]]
    updatedNote: Optional[Dict[str, Any]] = None
    originalNote: Optional[Dict[str, Any]] = None
    changes: Optional[Dict[str, bool]] = None

# Update the feedback endpoint to use the new model and include note context
@app.post("/api/feedback")
async def receive_feedback(data: UpdatedNoteModel):
    try:
        # Process the canvas hierarchy data
        manager = HierarchicalDataManager(os.getenv("GEMINI_API_KEY"), data.canvasHierarchy)
        
        # Create a more targeted prompt based on the updated note
        if data.updatedNote:
            # Extract information about the updated note
            note_title = data.updatedNote.get("title", "")
            note_content = data.updatedNote.get("content", "")
            note_sector = data.updatedNote.get("sector", "")
            
            # Get information about what changed
            changes = data.changes or {}
            changed_title = changes.get("title", False)
            changed_content = changes.get("content", False)
            
            # Get original note information if available
            original_title = data.originalNote.get("title", "") if data.originalNote else ""
            original_content = data.originalNote.get("content", "") if data.originalNote else ""
            
            # Create a custom prompt that includes the specific note context
            custom_prompt = f"""
    You are a seasoned business strategist AI analyzing our venture's foundational elements.
    
    A business note has just been updated with the following changes:
    
    {f"Title changed from '{original_title}' to '{note_title}'" if changed_title else f"Title: {note_title}"}
    {f"Content changed from '{original_content}' to '{note_content}'" if changed_content else f"Content: {note_content}"}
    Sector: {note_sector}
    
    Based on this specific update and considering the broader business context:
    {manager.knowledge_base}
    
    Generate one piercing question that:
    1) Connects this specific update to other operational areas
    2) Identifies potential strategic implications of this change
    3) Challenges assumptions or reveals hidden opportunities
    
    Focus on how this specific change might create ripple effects across the business.
    
    Format your response EXACTLY as follows:
    Change in business plans: [summarize the change in the business plan VERY BRIEFLY, 1-2 sentences max]
    --------------------------------------
    💡 - Question/Insight: [insert your business insight here as a thought-provoking question]
    
    Do not include any additional text, commentary, or formatting.
"""
            
            # Generate feedback using the custom prompt
            response = manager.model.generate_content(custom_prompt)
            
            # Check if response has text attribute
            if hasattr(response, 'text'):
                feedback = response.text
                print(f"Successfully generated feedback: {feedback[:100]}...")
                return {
                    "status": "success", 
                    "message": feedback,
                    "feedback": feedback
                }
            else:
                print(f"Unexpected response format: {response}")
                # Fall back to the general feedback method
                response = manager.generate_feedback()
                return {
                    "status": "success", 
                    "message": response["message"],
                    "feedback": response["message"]
                }
        else:
            # If no specific note was updated, use the general feedback method
            response = manager.generate_feedback()
            
            if response["message"] == "Error occurred":
                raise Exception("Failed to generate feedback")
                
            return {
                "status": "success", 
                "message": response["message"],
                "feedback": response["message"]
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing feedback: {str(e)}")

