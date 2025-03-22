from typing import List, Optional

class StickyNote:
    def __init__(self, title: str, description: str):
        self.title = title
        self.description = description
        self.children = {}

    def add_child(self, title: str, description: str):
        if title in self.children:
            raise ValueError("A sticky note with this title already exists at this level.")
        self.children[title] = StickyNote(title, description)
    
    def get_child(self, title: str) -> Optional["StickyNote"]:
        return self.children.get(title)
        
    def to_dict(self):
        """Convert the sticky note to a dictionary format for JSON serialization"""
        children_list = []
        for title, child in self.children.items():
            child_dict = child.to_dict()
            child_dict["id"] = title  # Use the title as the ID for simplicity
            children_list.append(child_dict)
            
        return {
            "title": self.title,
            "description": self.description,
            "children": children_list
        }

    def __repr__(self):
        return f"StickyNote(title={self.title}, children={list(self.children.keys())})"

class StickyNoteTree:
    def __init__(self):
        self.root = StickyNote("Root", "Top-level container")

    def traverse_and_add(self, path: List[str], title: str, description: str):
        current = self.root
        for level in path:
            if level in current.children:
                current = current.children[level]
            else:
                raise ValueError(f"Path '{level}' does not exist")

        current.add_child(title, description)

    def to_dict(self):
        """Convert the entire tree to a dictionary format for JSON serialization"""
        return {
            "root": self.root.to_dict()
        }
        
    def __repr__(self):
        return f"StickyNoteTree(root={self.root})"
