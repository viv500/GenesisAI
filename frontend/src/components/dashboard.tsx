"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { StickyNote } from "@/components/sticky-note"
import { AIChat } from "@/components/ai-chat"
import { DashboardHeader } from "@/components/dashboard-header"
import { Timeline } from "@/components/timeline"
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
  };

  const handleAddNote = async () => {
    const sectors: BusinessSector[] = ["inventory", "manufacturing", "product", "human", "marketing", "financial"];
    const colors = ["bg-yellow-200", "bg-blue-200", "bg-green-200", "bg-purple-200", "bg-red-200", "bg-indigo-200"];

    const randomSector = sectors[Math.floor(Math.random() * sectors.length)];
    const sectorIndex = sectors.indexOf(randomSector);
    const newZIndex = highestZIndex + 1;

    const newNote: Note = {
      id: generateUniqueId(),
      title: randomSector.charAt(0).toUpperCase() + randomSector.slice(1),
      content: "Click to edit this note and add your business information.",
      position: { x: 200, y: 200 },
      color: colors[sectorIndex],
      sector: randomSector,
      selected: false,
      files: [],
      parentId: getCurrentParentId(),
      zIndex: newZIndex,
    };

    try {
      // Update backend
      const response = await fetch("/api/add-sticky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: [...path],
          sticky: newNote
        }),
      });

      if (!response.ok) throw new Error("Failed to save to backend");

      // Update frontend state
      const currentCanvasId = getCurrentParentId();
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
      toast.success(`A new ${newNote.title} note has been added`);

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

  const handleNoteEdit = (id: string, updatedNote: Partial<Note>) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => (note.id === id ? { ...note, ...updatedNote } : note),
    )

    setCanvasHierarchy(updatedHierarchy)
  }

  const handleNoteDelete = (id: string) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].filter(
      (note) => note.id !== id,
    )

    // Also delete any nested canvases
    if (updatedHierarchy[activeCheckpoint][id]) {
      delete updatedHierarchy[activeCheckpoint][id]
    }

    setCanvasHierarchy(updatedHierarchy)

    toast.success("The note has been removed from your canvas.")
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
        onAddNote={handleAddNote}
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
          onClick={handleAddNote}
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add Note</span>
        </Button>
      </div>

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
