"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { StickyNote } from "@/components/sticky-note"
import { AIChat } from "@/components/ai-chat"
import { DashboardHeader } from "@/components/dashboard-header"
import { Timeline } from "@/components/timeline"
import { AddNoteDialog } from "@/components/add-note-dialog" // Import the dialog component
import type { Note, BusinessSector, TimelineCheckpoint } from "@/lib/types"
import { generateUniqueId } from "@/lib/utils"

export default function Dashboard() {
  // Timeline state
  const [checkpoints, setCheckpoints] = useState<TimelineCheckpoint[]>([
    { id: "cp-1", title: "Q1 2023", date: new Date(2023, 0, 1) },
    { id: "cp-2", title: "Q2 2023", date: new Date(2023, 3, 1) },
    { id: "cp-3", title: "Q3 2023", date: new Date(2023, 6, 1) },
  ])
  const [activeCheckpoint, setActiveCheckpoint] = useState<string>("cp-1")

  // Canvas navigation state
  const [canvasStack, setCanvasStack] = useState<string[]>(["root"])
  
  // Track the highest z-index for notes
  const [highestZIndex, setHighestZIndex] = useState(1)
  
  // Add dialog state
  const [isAddNoteDialogOpen, setIsAddNoteDialogOpen] = useState(false)
  
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
          selected: false,
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
          selected: false,
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
          selected: false,
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
          selected: false,
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
          selected: false,
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
          selected: false,
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
          selected: false,
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
          selected: false,
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
          selected: false,
          files: [],
          parentId: null,
          zIndex: 1,
        },
      ],
    },
  })

  const [path, setPath] = useState<string[]>([]);

  const getCurrentParentId = () => path.length > 0 ? path[path.length - 1] : "root";

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

  // Modified to open the dialog instead of creating a note directly
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
    
    // Get the current canvas ID consistently
    const currentCanvasId = canvasStack[canvasStack.length - 1];

    const newNote: Note = {
      id: generateUniqueId(),
      title: title,
      content: content,
      position: { x: 200, y: 200 },
      color: colors[sector],
      sector: sector,
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
              description: content // Use description instead of content for backend
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
        // Continue with frontend update even if backend fails
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
      
      // Close the dialog
      setIsAddNoteDialogOpen(false);

    } catch (error) {
      console.error("Failed to add note:", error);
      toast.error("Failed to save note. Please try again.");
    }
  };

  // Get current notes based on active checkpoint and canvas
  const getCurrentNotes = (): Note[] => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]
    return canvasHierarchy[activeCheckpoint]?.[currentCanvasId] || []
  }

  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Initialize empty canvas for new checkpoints or nested notes
  useEffect(() => {
    // Ensure all checkpoints have a root canvas
    const updatedHierarchy = { ...canvasHierarchy }

    checkpoints.forEach((checkpoint) => {
      if (!updatedHierarchy[checkpoint.id]) {
        updatedHierarchy[checkpoint.id] = { root: [] }
      }
    })

    setCanvasHierarchy(updatedHierarchy)
  }, [checkpoints])


  const handleNoteSelect = (id: string) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]
    
    // Increment the highest z-index
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)

    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => ({
        ...note,
        selected: note.id === id ? !note.selected : note.selected,
        // Give the selected note the highest z-index
        zIndex: note.id === id ? newZIndex : note.zIndex || 1,
      }),
    )

    setCanvasHierarchy(updatedHierarchy)
  }

  const handleNoteEdit = async (id: string, updatedNote: Partial<Note>) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    // Find the current note to get its original data BEFORE updating the frontend state
    const originalNote = canvasHierarchy[activeCheckpoint][currentCanvasId].find(note => note.id === id)
    
    if (!originalNote) {
      console.error("Note not found for editing")
      return
    }
    
    // Store the original title for path construction
    const originalTitle = originalNote.title

    // Update the frontend state
    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => (note.id === id ? { ...note, ...updatedNote } : note),
    )

    setCanvasHierarchy(updatedHierarchy)

    // If title or content is being updated, call the backend API
    if (updatedNote.title || updatedNote.content) {
      try {
        // Build the path to the note using the ORIGINAL title
        const notePath = [...path, originalTitle]
        
        console.log("Sending edit request with path:", notePath)
        console.log("New title:", updatedNote.title || originalTitle)
        console.log("New content:", updatedNote.content || originalNote.content)

        // Call the backend API
        const response = await fetch("http://localhost:8000/api/edit-sticky", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: notePath,
            title: updatedNote.title || originalTitle,
            description: updatedNote.content || originalNote.content
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.warn("Backend API call for editing note failed:", errorData)
          toast.error(`Failed to save changes: ${errorData.detail || 'Unknown error'}`)
        }
      } catch (error) {
        console.error("Error updating note:", error)
        toast.error("Failed to save changes to the server")
      }
    }
  }

  const handleNoteDelete = async (id: string) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    // Find the note before we delete it from the frontend
    const noteToDelete = canvasHierarchy[activeCheckpoint][currentCanvasId].find(note => note.id === id)
    
    if (!noteToDelete) {
      console.error("Note not found for deletion")
      return
    }
    
    // Get the note title for the path
    const noteTitle = noteToDelete.title

    // First update the frontend state
    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].filter(
      (note) => note.id !== id,
    )

    // Also delete any nested canvases
    if (updatedHierarchy[activeCheckpoint][id]) {
      delete updatedHierarchy[activeCheckpoint][id]
    }

    setCanvasHierarchy(updatedHierarchy)

    // Call the backend API to delete the note
    try {
      // Build the path to the note using titles
      const notePath = [...path, noteTitle]
      
      console.log("Sending delete request with path:", notePath)

      // Call the backend API
      const response = await fetch("http://localhost:8000/api/delete-sticky", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: notePath
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.warn("Backend API call for deleting note failed:", errorData)
        toast.error(`Failed to delete note: ${errorData.detail || 'Unknown error'}`)
      } else {
        toast.success("The note has been removed from your canvas.")
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Failed to delete note from the server")
    }
  }

  const handleOpenAIChat = () => {
    const currentNotes = getCurrentNotes()
    const selectedNotes = currentNotes.filter((note) => note.selected)

    if (selectedNotes.length === 0) {
      toast.error("Please select at least one note to use the AI assistant.")
      return
    }

    setIsAIChatOpen(true)
  }

  const handleAddCheckpoint = () => {
    const newId = `cp-${checkpoints.length + 1}`
    const newTitle = `Q${(checkpoints.length % 4) + 1} ${Math.floor(checkpoints.length / 4) + 2023}`

    const newCheckpoint: TimelineCheckpoint = {
      id: newId,
      title: newTitle,
      date: new Date(),
    }

    setCheckpoints([...checkpoints, newCheckpoint])

    // Initialize empty canvas for the new checkpoint
    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[newId] = { root: [] }
    setCanvasHierarchy(updatedHierarchy)

    toast.success(`A new checkpoint "${newTitle}" has been added to the timeline.`)
  }

  const handleApplyAIChanges = (updatedNotes: Note[]) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    const updatedHierarchy = { ...canvasHierarchy }

    updatedNotes.forEach((updatedNote) => {
      updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
        (note) => (note.id === updatedNote.id ? { ...note, ...updatedNote } : note),
      )
    })

    setCanvasHierarchy(updatedHierarchy)
    setIsAIChatOpen(false)

    toast.success("AI suggestions applied to your notes!")
  }

  const currentNotes = getCurrentNotes()
  const currentCanvasTitle = path.length > 0 ? path[path.length - 1] : "Main Canvas";
  
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader
        onAddNote={handleAddNoteClick} // Updated to open dialog
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
              // Make sure zIndex is included here
              zIndex: note.zIndex || 1
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
          onClick={handleAddNoteClick} // Updated to open dialog
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Note</span>
        </Button>
      </div>

      {/* Add Note Dialog */}
      <AddNoteDialog
        isOpen={isAddNoteDialogOpen}
        onClose={() => setIsAddNoteDialogOpen(false)}
        onAddNote={handleAddNoteFromDialog}
      />

      {isAIChatOpen && (
        <AIChat
          selectedNotes={currentNotes.filter((note) => note.selected)}
          onClose={() => setIsAIChatOpen(false)}
          onApplyChanges={handleApplyAIChanges}
        />
      )}
    </div>
  )
}
