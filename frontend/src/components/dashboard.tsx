"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StickyNote } from "@/components/sticky-note";
import { AIChat } from "@/components/ai-chat";
import { DashboardHeader } from "@/components/dashboard-header";
import { Timeline } from "@/components/timeline";
import { AddNoteDialog } from "@/components/add-note-dialog";
import type { Note, BusinessSector, TimelineCheckpoint } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";

export default function Dashboard() {
  // Timeline state
  const [checkpoints, setCheckpoints] = useState<TimelineCheckpoint[]>([
    { id: "cp-1", title: "Q1 2023", date: new Date(2023, 0, 1) },
    { id: "cp-2", title: "Q2 2023", date: new Date(2023, 3, 1) },
    { id: "cp-3", title: "Q3 2023", date: new Date(2023, 6, 1) },
  ]);
  const [activeCheckpoint, setActiveCheckpoint] = useState<string>("cp-1");

  // Canvas navigation state
  const [canvasStack, setCanvasStack] = useState<string[]>(["root"]);
  
  // Track the highest z-index for notes
  const [highestZIndex, setHighestZIndex] = useState(1);
  
  // Add dialog state
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false);
  
  const [canvasHierarchy, setCanvasHierarchy] = useState<Record<string, Record<string, Note[]>>>({
    "cp-1": {
      root: [
        {
          id: "note-1",
          title: "Inventory",
          content: "Track and manage your inventory levels, suppliers, and procurement processes.",
          position: { x: 100, y: 100 },
          color: "bg-yellow-200",
          sector: "inventory",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
        {
          id: "note-2",
          title: "Manufacturing",
          content: "Monitor production processes, quality control, and operational efficiency.",
          position: { x: 400, y: 100 },
          color: "bg-blue-200",
          sector: "manufacturing",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
        {
          id: "note-3",
          title: "Product Strategy",
          content: "Plan product roadmaps, feature development, and market positioning.",
          position: { x: 100, y: 350 },
          color: "bg-green-200",
          sector: "product",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
        {
          id: "note-4",
          title: "Human Operations",
          content: "Manage recruitment, training, performance, and employee engagement.",
          position: { x: 400, y: 350 },
          color: "bg-purple-200",
          sector: "human",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
      ],
      "note-1": [
        {
          id: "note-1-1",
          title: "Suppliers",
          content: "List of key suppliers and contact information.",
          position: { x: 100, y: 100 },
          color: "bg-yellow-100",
          sector: "inventory",
          selected: true,
          files: [],
          parentId: "note-1",
          zIndex: 1,
        },
        {
          id: "note-1-2",
          title: "Stock Levels",
          content: "Current inventory levels and reorder points.",
          position: { x: 400, y: 100 },
          color: "bg-yellow-100",
          sector: "inventory",
          selected: true,
          files: [],
          parentId: "note-1",
          zIndex: 1,
        },
      ],
    },
    "cp-2": {
      root: [
        {
          id: "note-5",
          title: "Inventory",
          content: "Updated inventory management system implemented.",
          position: { x: 100, y: 100 },
          color: "bg-yellow-200",
          sector: "inventory",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
        {
          id: "note-6",
          title: "Manufacturing",
          content: "New production line added, increasing capacity by 30%.",
          position: { x: 400, y: 100 },
          color: "bg-blue-200",
          sector: "manufacturing",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
      ],
    },
    "cp-3": {
      root: [
        {
          id: "note-7",
          title: "Product Strategy",
          content: "New product line launched, targeting enterprise customers.",
          position: { x: 100, y: 100 },
          color: "bg-green-200",
          sector: "product",
          selected: true,
          files: [],
          parentId: null,
          zIndex: 1,
        },
      ],
    },
  });

  const [path, setPath] = useState<string[]>([]);

  const getCurrentParentId = () => (path.length > 0 ? path[path.length - 1] : "root");

  const handleOpenNestedCanvas = (noteId: string, noteTitle: string) => {
    // Add to navigation path
    setPath([...path, noteTitle]);
    
    // Add to canvas stack
    setCanvasStack([...canvasStack, noteId]);
    
    // Initialize empty canvas for the note if it doesn't exist
    const updatedHierarchy = { ...canvasHierarchy };
    if (!updatedHierarchy[activeCheckpoint][noteId]) {
      updatedHierarchy[activeCheckpoint][noteId] = [];
      setCanvasHierarchy(updatedHierarchy);
    }
  };

  const handleNavigateBack = () => {
    if (path.length > 0) {
      setPath(path.slice(0, -1));
    }
    
    if (canvasStack.length > 1) {
      setCanvasStack(canvasStack.slice(0, -1));
    }
  };

  // Open the add note dialog
  const handleAddNoteClick = () => {
    setIsAddNoteDialogOpen(true);
  };

  // New function to handle note creation from dialog
  const handleAddNoteFromDialog = async (title: string, content: string, sector: BusinessSector) => {
    const colors = {
      "inventory": "bg-yellow-200",
      "manufacturing": "bg-blue-200", 
      "product": "bg-green-200",
      "human": "bg-purple-200",
      "marketing": "bg-red-200",
      "financial": "bg-indigo-200"
    };
    
    const newZIndex = highestZIndex + 1;
    const currentCanvasId = canvasStack[canvasStack.length - 1];

    const newNote: Note = {
      id: generateUniqueId(),
      title,
      content,
      position: { x: 200, y: 200 },
      color: colors[sector],
      sector,
      selected: false,
      files: [],
      parentId: currentCanvasId === "root" ? null : currentCanvasId,
      zIndex: newZIndex,
    };

    try {
      // Update backend - wrap in try/catch to handle potential API failures gracefully
      try {
        console.log("Sending add request with path:", path);
        
        const response = await fetch("http://localhost:8000/api/add-sticky", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: [...path],
            sticky: {
              title: title,
              description: content
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.warn("Backend API call failed:", errorData);
          toast.error(`Failed to add note: ${errorData.detail || 'Unknown error'}`);
          // Continue with frontend update even if backend fails
        }
      } catch (apiError) {
        console.warn("Backend API call failed, but continuing with frontend update:", apiError);
      }

      // Update frontend state
      const updatedHierarchy = { ...canvasHierarchy };
      if (!updatedHierarchy[activeCheckpoint][currentCanvasId]) {
        updatedHierarchy[activeCheckpoint][currentCanvasId] = [];
      }
      updatedHierarchy[activeCheckpoint][currentCanvasId] = [
        ...updatedHierarchy[activeCheckpoint][currentCanvasId],
        newNote,
      ];
      setCanvasHierarchy(updatedHierarchy);
      setHighestZIndex(newZIndex);
      toast.success(`A new note "${title}" has been added`);
      setIsAddNoteDialogOpen(false);
    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("Failed to save note. Please try again.");
    }
  };

  // Get current notes based on active checkpoint and canvas
  const getCurrentNotes = (): Note[] => {
    const currentCanvasId = canvasStack[canvasStack.length - 1];
    return canvasHierarchy[activeCheckpoint]?.[currentCanvasId] || [];
  };

  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize empty canvas for new checkpoints or nested notes
  useEffect(() => {
    const updatedHierarchy = { ...canvasHierarchy };
    checkpoints.forEach((checkpoint) => {
      if (!updatedHierarchy[checkpoint.id]) {
        updatedHierarchy[checkpoint.id] = { root: [] };
      }
    });
    setCanvasHierarchy(updatedHierarchy);
  }, [checkpoints]);

  const handleNoteSelect = (id: string) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1];
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    const updatedHierarchy = { ...canvasHierarchy };
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => ({
        ...note,
        selected: note.id === id ? !note.selected : note.selected,
        zIndex: note.id === id ? newZIndex : note.zIndex || 1,
      }),
    );
    setCanvasHierarchy(updatedHierarchy);
  };

  const handleNoteEdit = async (id: string, updatedNote: Partial<Note>) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1];
    const originalNote = canvasHierarchy[activeCheckpoint][currentCanvasId].find(note => note.id === id);
    if (!originalNote) {
      console.error("Note not found for editing");
      return;
    }
    const updatedHierarchy = { ...canvasHierarchy };
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => (note.id === id ? { ...note, ...updatedNote } : note),
    );
    setCanvasHierarchy(updatedHierarchy);
    
    // Backend API request to get feedback 
    try {
      const response = await fetch("http://localhost:8000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ canvasHierarchy: updatedHierarchy }),
      });
      if (!response.ok) {
        throw new Error("Failed to send canvas feedback");
      }
      const data = await response.json()
      console.log("Backend was properly triggered: ", data.message)
    } catch (error) {
      console.error("API error:", error);
      toast.error("Failed to update canvas details.");
    }
  };

  const handleNoteDelete = async (id: string) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1];
    const noteToDelete = canvasHierarchy[activeCheckpoint][currentCanvasId].find(note => note.id === id);
    if (!noteToDelete) {
      console.error("Note not found for deletion");
      return;
    }
    const updatedHierarchy = { ...canvasHierarchy };
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].filter(
      (note) => note.id !== id,
    );
    if (updatedHierarchy[activeCheckpoint][id]) {
      delete updatedHierarchy[activeCheckpoint][id];
    }
    setCanvasHierarchy(updatedHierarchy);
    // Optional: Call backend API to delete note (omitted for brevity)
  };

  const handleOpenAIChat = () => {
    const currentNotes = getCurrentNotes();
    const selectedNotes = currentNotes.filter((note) => note.selected);
    if (selectedNotes.length === 0) {
      toast.error("Please select at least one note to use the AI assistant.");
      return;
    }
    setIsAIChatOpen(true);
  };

  const handleAddCheckpoint = () => {
    const newId = `cp-${checkpoints.length + 1}`;
    const newTitle = `Q${(checkpoints.length % 4) + 1} ${Math.floor(checkpoints.length / 4) + 2023}`;
    const newCheckpoint: TimelineCheckpoint = {
      id: newId,
      title: newTitle,
      date: new Date(),
    };
    setCheckpoints([...checkpoints, newCheckpoint]);
    const updatedHierarchy = { ...canvasHierarchy };
    updatedHierarchy[newId] = { root: [] };
    setCanvasHierarchy(updatedHierarchy);
    toast.success(`A new checkpoint "${newTitle}" has been added to the timeline.`);
  };

  // Updated: Function to update canvas hierarchy based on AI suggestions
  const handleApplyAIChanges = (updatedHierarchy: Record<string, Record<string, Note[]>>) => {
    setCanvasHierarchy(updatedHierarchy);
    setIsAIChatOpen(false);
    toast.success("Canvas hierarchy has been updated based on AI suggestions!");
  };

  // NEW: Function to update the canvas hierarchy by calling the backend API
  const handleChangeDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/updateCanvas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ canvasHierarchy }),
      });
      if (!response.ok) {
        throw new Error("Failed to update canvas details");
      }
      const updatedHierarchy = await response.json();
      setCanvasHierarchy(updatedHierarchy);

      // Optionally, set active checkpoint to the first key in the updated hierarchy
      const checkpointIds = Object.keys(updatedHierarchy);
      if (checkpointIds.length > 0) {
        setActiveCheckpoint(checkpointIds[0]);
      }

      toast.success("Canvas details updated!");
    } catch (error) {
      console.error("API error:", error);
      toast.error("Failed to update canvas details.");
    }
  };

  const currentNotes = getCurrentNotes();
  const currentCanvasTitle = path.length > 0 ? path[path.length - 1] : "Main Canvas";
  
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader
        onAddNote={handleAddNoteClick}
        onOpenAIChat={handleOpenAIChat}
        selectedCount={currentNotes.filter((note) => note.selected).length}
      />

      <Timeline
        checkpoints={checkpoints}
        activeCheckpoint={activeCheckpoint}
        onSelectCheckpoint={setActiveCheckpoint}
        onAddCheckpoint={handleAddCheckpoint}
      />

      <div className="flex items-center px-4 py-2 bg-muted/30 border-y">
        <div className="flex items-center">
          {path.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleNavigateBack} className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <div className="flex items-center">
            <span className="text-sm font-medium">{currentCanvasTitle}</span>
            {path.map((title, index) => (
              <div key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                <span className="text-sm font-medium">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="flex-1 relative bg-gray-50 dark:bg-gray-900 overflow-auto"
        style={{ minHeight: "calc(100vh - 160px)" }}
      >
        {currentNotes.map((note) => (
          <StickyNote
            key={note.id}
            note={{
              ...note,
              zIndex: note.zIndex || 1,
            }}
            onSelect={() => handleNoteSelect(note.id)}
            onEdit={(updatedNote) => handleNoteEdit(note.id, updatedNote)}
            onDelete={() => handleNoteDelete(note.id)}
            onOpen={() => handleOpenNestedCanvas(note.id, note.title)}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          onClick={handleAddNoteClick}
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Note</span>
        </Button>
      </div>

      <AddNoteDialog
        isOpen={isAddNoteDialogOpen}
        onClose={() => setIsAddNoteDialogOpen(false)}
        onAddNote={handleAddNoteFromDialog}
      />

      {isAIChatOpen && (
        <AIChat
          currentHierarchy={canvasHierarchy}
          selectedNotes={currentNotes.filter((note) => note.selected)}
          onClose={() => setIsAIChatOpen(false)}
          onApplyChanges={handleApplyAIChanges}
        />
      )}
    </div>
  );
}
