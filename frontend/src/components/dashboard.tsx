"use client"

import { useState, useRef, useEffect } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { StickyNote } from "@/components/sticky-note"
import { AIChat } from "@/components/ai-chat"
import { DashboardHeader } from "@/components/dashboard-header"
import { Timeline } from "@/components/timeline"
import { FeedbackPanel } from "@/components/feedback-panel"
import type { Note, BusinessSector, TimelineCheckpoint } from "@/lib/types"
import { generateUniqueId } from "@/lib/utils"

interface FeedbackItem {
  id: string
  message: string
  timestamp: Date
}

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
  const [canvasHierarchy, setCanvasHierarchy] = useState<Record<string, Record<string, Note[]>>>({
  "cp-1": {
    "root": [
      {
        "id": "note-1",
        "title": "Inventory",
        "content": "Track and manage your inventory levels, suppliers, and procurement processes.",
        "position": { "x": 100, "y": 100 },
        "color": "bg-yellow-200",
        "sector": "inventory",
        "selected": false,
        "files": [],
        "parentId": null
      },
      {
        "id": "note-2",
        "title": "Manufacturing",
        "content": "Monitor production processes, quality control, and operational efficiency.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-blue-200",
        "sector": "manufacturing",
        "selected": false,
        "files": [],
        "parentId": null
      },
      {
        "id": "note-3",
        "title": "Product Strategy",
        "content": "Plan product roadmaps, feature development, and market positioning.",
        "position": { "x": 100, "y": 350 },
        "color": "bg-green-200",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": null
      },
      {
        "id": "note-4",
        "title": "Human Operations",
        "content": "Manage recruitment, training, performance, and employee engagement.",
        "position": { "x": 400, "y": 350 },
        "color": "bg-purple-200",
        "sector": "human",
        "selected": false,
        "files": [],
        "parentId": null
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
        "selected": false,
        "files": [],
        "parentId": "note-1"
      },
      {
        "id": "note-1-2",
        "title": "Stock Levels",
        "content": "Current inventory levels and reorder points.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-yellow-100",
        "sector": "inventory",
        "selected": false,
        "files": [],
        "parentId": "note-1"
      },
      {
        "id": "note-1-3",
        "title": "Eco-Friendly Inventory Sourcing",
        "content": "Evaluate suppliers based on sustainability criteria and eco-friendly practices.",
        "position": { "x": 100, "y": 200 },
        "color": "bg-green-100",
        "sector": "inventory",
        "selected": false,
        "files": [],
        "parentId": "note-1"
      },
      {
        "id": "note-1-4",
        "title": "Waste Reduction Metrics",
        "content": "Integrate data analytics to track and reduce waste in storage and handling.",
        "position": { "x": 300, "y": 200 },
        "color": "bg-green-100",
        "sector": "inventory",
        "selected": false,
        "files": [],
        "parentId": "note-1"
      },
      {
        "id": "note-1-5",
        "title": "Resource Optimization",
        "content": "Apply AI to optimize inventory levels, reducing overstock and spoilage.",
        "position": { "x": 500, "y": 200 },
        "color": "bg-green-100",
        "sector": "inventory",
        "selected": false,
        "files": [],
        "parentId": "note-1"
      },
      {
        "id": "note-1-6",
        "title": "Sustainability Partnerships",
        "content": "Develop collaborations with green tech partners to enhance supply chain sustainability.",
        "position": { "x": 700, "y": 200 },
        "color": "bg-green-100",
        "sector": "inventory",
        "selected": false,
        "files": [],
        "parentId": "note-1"
      }
    ],
    "note-2": [
      {
        "id": "note-2-1",
        "title": "Eco-Efficient Production Methods",
        "content": "Adopt sustainable manufacturing processes to minimize energy usage.",
        "position": { "x": 400, "y": 150 },
        "color": "bg-blue-100",
        "sector": "manufacturing",
        "selected": false,
        "files": [],
        "parentId": "note-2"
      },
      {
        "id": "note-2-2",
        "title": "Maintenance Predictive Analytics",
        "content": "Use AI to predict maintenance needs, reducing downtime and resource waste.",
        "position": { "x": 600, "y": 150 },
        "color": "bg-blue-100",
        "sector": "manufacturing",
        "selected": false,
        "files": [],
        "parentId": "note-2"
      },
      {
        "id": "note-2-3",
        "title": "Sustainable Material Sourcing",
        "content": "Integrate AI insights to source eco-friendly materials for production.",
        "position": { "x": 800, "y": 150 },
        "color": "bg-blue-100",
        "sector": "manufacturing",
        "selected": false,
        "files": [],
        "parentId": "note-2"
      },
      {
        "id": "note-2-4",
        "title": "Energy Cost Optimization",
        "content": "Leverage operational data to reduce energy costs and emissions in manufacturing.",
        "position": { "x": 1000, "y": 150 },
        "color": "bg-blue-100",
        "sector": "manufacturing",
        "selected": false,
        "files": [],
        "parentId": "note-2"
      }
    ],
    "note-3": [
      {
        "id": "note-3-1",
        "title": "Sustainable Product Roadmap",
        "content": "Plan product features that integrate eco-friendly technologies and materials.",
        "position": { "x": 100, "y": 450 },
        "color": "bg-green-100",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-3"
      },
      {
        "id": "note-3-2",
        "title": "Market Positioning for Sustainability",
        "content": "Define your market niche by emphasizing sustainability and cost savings.",
        "position": { "x": 300, "y": 450 },
        "color": "bg-green-100",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-3"
      },
      {
        "id": "note-3-3",
        "title": "Competitive Analysis with ESG Focus",
        "content": "Analyze competitors’ sustainability metrics and use them to refine your strategy.",
        "position": { "x": 500, "y": 450 },
        "color": "bg-green-100",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-3"
      },
      {
        "id": "note-3-4",
        "title": "Customer-Centric Sustainable Design",
        "content": "Incorporate customer feedback on eco-friendly features into your product strategy.",
        "position": { "x": 700, "y": 450 },
        "color": "bg-green-100",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-3"
      }
    ],
    "note-4": [
      {
        "id": "note-4-1",
        "title": "Green Talent Recruitment",
        "content": "Focus on hiring experts in sustainability and green technology.",
        "position": { "x": 400, "y": 400 },
        "color": "bg-purple-100",
        "sector": "human",
        "selected": false,
        "files": [],
        "parentId": "note-4"
      },
      {
        "id": "note-4-2",
        "title": "Sustainability Training Programs",
        "content": "Implement training to improve employee awareness of eco-friendly practices.",
        "position": { "x": 600, "y": 400 },
        "color": "bg-purple-100",
        "sector": "human",
        "selected": false,
        "files": [],
        "parentId": "note-4"
      },
      {
        "id": "note-4-3",
        "title": "Performance Incentives for Green Practices",
        "content": "Develop incentive programs to reward sustainable performance and innovation.",
        "position": { "x": 800, "y": 400 },
        "color": "bg-purple-100",
        "sector": "human",
        "selected": false,
        "files": [],
        "parentId": "note-4"
      },
      {
        "id": "note-4-4",
        "title": "Collaborative Sustainability Initiatives",
        "content": "Encourage cross-department collaboration on eco-innovation projects.",
        "position": { "x": 1000, "y": 400 },
        "color": "bg-purple-100",
        "sector": "human",
        "selected": false,
        "files": [],
        "parentId": "note-4"
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
        "selected": false,
        "files": [],
        "parentId": null
      },
      {
        "id": "note-6",
        "title": "Manufacturing",
        "content": "New production line added, increasing capacity by 30%.",
        "position": { "x": 400, "y": 100 },
        "color": "bg-blue-200",
        "sector": "manufacturing",
        "selected": false,
        "files": [],
        "parentId": null
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
        "selected": false,
        "files": [],
        "parentId": null
      }
    ]
  },
  "cp-4": {
    "root": [
      {
        "id": "note-8",
        "title": "Startup Idea: EcoSynth AI",
        "content": "AI-Driven Sustainable Resource Optimization platform that helps enterprises slash waste and energy costs by analyzing operational data, predicting maintenance needs, and optimizing supply chains. Targets manufacturing, logistics, and agriculture while integrating generative AI to propose eco-friendly materials/processes and track ESG sustainability metrics.",
        "position": { "x": 50, "y": 50 },
        "color": "bg-teal-200",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": null
      },
      {
        "id": "note-9",
        "title": "Key Resources",
        "content": "Utilizes open-source ML frameworks (TensorFlow, PyTorch), cloud GPU credits via AWS Activate or Google Cloud for Startups, and partnerships with universities like MIT Climate & Sustainability Consortium and Stanford’s Precourt Institute.",
        "position": { "x": 300, "y": 50 },
        "color": "bg-teal-300",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      },
      {
        "id": "note-10",
        "title": "Target Locations",
        "content": "Ideal locations include Austin (Texas) for its AI talent and industry access, Berlin (Germany) for EU climate grants, Toronto (Canada) for research access via Vector Institute, and Singapore as a gateway to Asia’s manufacturing hubs. Bootstrapping may begin in a cost-effective hub like Prague.",
        "position": { "x": 550, "y": 50 },
        "color": "bg-teal-300",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      },
      {
        "id": "note-11",
        "title": "Industry Applications",
        "content": "EcoSynth AI applies to industries such as manufacturing, logistics, and agriculture, optimizing supply chains, reducing waste, and lowering energy consumption.",
        "position": { "x": 50, "y": 250 },
        "color": "bg-teal-300",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      },
      {
        "id": "note-12",
        "title": "Funding & Accelerators",
        "content": "Leverage programs like Techstars Sustainability, Y Combinator, and federal funding (e.g., SDTC in Canada) for mentorship and seed capital.",
        "position": { "x": 300, "y": 250 },
        "color": "bg-teal-300",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      },
      {
        "id": "note-13",
        "title": "Sustainability Metrics",
        "content": "Implement systems to track ESG compliance, energy usage, waste reduction, and other sustainability metrics.",
        "position": { "x": 550, "y": 250 },
        "color": "bg-teal-300",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      }
    ],
    "note-8": [
      {
        "id": "note-8-1",
        "title": "Value Proposition",
        "content": "EcoSynth AI offers a unique value by combining real-time operational data with advanced AI analytics to propose sustainable, cost-saving measures.",
        "position": { "x": 50, "y": 150 },
        "color": "bg-teal-100",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      },
      {
        "id": "note-8-2",
        "title": "Competitive Edge",
        "content": "Integrates generative AI for eco-friendly material suggestions and sustainability tracking, differentiating it from traditional resource management systems.",
        "position": { "x": 300, "y": 150 },
        "color": "bg-teal-100",
        "sector": "product",
        "selected": false,
        "files": [],
        "parentId": "note-8"
      }
    ]
  }
}

)

  // Feedback panel state
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [isFeedbackPanelOpen, setIsFeedbackPanelOpen] = useState(false)

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

  const handleAddNote = () => {
    const sectors: BusinessSector[] = ["inventory", "manufacturing", "product", "human", "marketing", "financial"]
    const colors = ["bg-yellow-200", "bg-blue-200", "bg-green-200", "bg-purple-200", "bg-red-200", "bg-indigo-200"]

    const randomSector = sectors[Math.floor(Math.random() * sectors.length)]
    const sectorIndex = sectors.indexOf(randomSector)

    const newNote: Note = {
      id: generateUniqueId(),
      title: randomSector.charAt(0).toUpperCase() + randomSector.slice(1),
      content: "Click to edit this note and add your business information.",
      position: { x: 200, y: 200 },
      color: colors[sectorIndex],
      sector: randomSector,
      selected: false,
      files: [],
      parentId: canvasStack.length > 1 ? canvasStack[canvasStack.length - 2] : null,
    }

    const currentCanvasId = canvasStack[canvasStack.length - 1]

    // Update the hierarchy with the new note
    const updatedHierarchy = { ...canvasHierarchy }
    if (!updatedHierarchy[activeCheckpoint][currentCanvasId]) {
      updatedHierarchy[activeCheckpoint][currentCanvasId] = []
    }

    updatedHierarchy[activeCheckpoint][currentCanvasId] = [
      ...updatedHierarchy[activeCheckpoint][currentCanvasId],
      newNote,
    ]

    setCanvasHierarchy(updatedHierarchy)

    toast.success(`A new ${newNote.title} note has been added to your canvas.`)
  }

  const handleNoteSelect = (id: string) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => ({
        ...note,
        selected: note.id === id ? !note.selected : note.selected,
      }),
    )

    setCanvasHierarchy(updatedHierarchy)
  }

  const handleNoteEdit = async (id: string, updatedNote: Partial<Note>) => {
    const currentCanvasId = canvasStack[canvasStack.length - 1]

    // Find the original note before updating
    const originalNote = canvasHierarchy[activeCheckpoint][currentCanvasId].find((note) => note.id === id)

    // Update the hierarchy with the edited note
    const updatedHierarchy = { ...canvasHierarchy }
    updatedHierarchy[activeCheckpoint][currentCanvasId] = updatedHierarchy[activeCheckpoint][currentCanvasId].map(
      (note) => (note.id === id ? { ...note, ...updatedNote } : note),
    )

    setCanvasHierarchy(updatedHierarchy)

    // Get the updated note after changes
    const updatedNoteComplete = updatedHierarchy[activeCheckpoint][currentCanvasId].find((note) => note.id === id)

    // Only generate feedback if content was edited (not just position)
    if (updatedNote.content || updatedNote.title) {
      try {
        // Call the backend API to generate feedback based on the updated note
        const response = await fetch("http://localhost:8000/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            canvasHierarchy: updatedHierarchy,
            updatedNote: updatedNoteComplete, // Include the complete updated note
            originalNote: originalNote, // Include the original note for context
            changes: {
              title: updatedNote.title !== undefined,
              content: updatedNote.content !== undefined,
              position: updatedNote.position !== undefined,
            },
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate feedback")
        }

        const data = await response.json()

        // Add the feedback to our list
        const newFeedback: FeedbackItem = {
          id: generateUniqueId(),
          message: data.feedback,
          timestamp: new Date(),
        }

        setFeedbackItems((prev) => [newFeedback, ...prev])

        // Make sure the feedback panel is open
        setIsFeedbackPanelOpen(true)
      } catch (error) {
        console.error("Failed to generate feedback:", error)

        // Fallback to local feedback generation if API call fails
        const feedbackQuestion = generateFeedbackQuestion(
          updatedHierarchy[activeCheckpoint][currentCanvasId].find((note) => note.id === id),
        )

        const newFeedback: FeedbackItem = {
          id: generateUniqueId(),
          message: feedbackQuestion,
          timestamp: new Date(),
        }

        setFeedbackItems((prev) => [newFeedback, ...prev])
        setIsFeedbackPanelOpen(true)
      }
    }
  }

  // Helper function for local feedback generation (fallback)
  const generateFeedbackQuestion = (note?: Note): string => {
    if (!note) return "How does this change impact your overall business strategy?"

    const questions = {
      inventory: [
        "Have you considered how changes in your inventory system might affect your cash flow?",
        "What impact would optimizing your inventory levels have on your manufacturing efficiency?",
        "How might just-in-time inventory practices reduce your operational costs?",
      ],
      manufacturing: [
        "How will this manufacturing change affect your product quality standards?",
        "Have you evaluated the environmental impact of your manufacturing processes?",
        "What training will your team need to adapt to these manufacturing changes?",
      ],
      product: [
        "How does this product strategy align with your target market's evolving needs?",
        "What competitive advantage does this product development give you?",
        "Have you considered how this product strategy impacts your marketing timeline?",
      ],
      human: [
        "How might these human operations changes affect employee retention?",
        "What metrics will you use to measure the success of these human resource initiatives?",
        "Have you considered how these changes align with your company culture?",
      ],
      marketing: [
        "How does this marketing approach differentiate you from competitors?",
        "What ROI metrics will you track for this marketing initiative?",
        "Have you considered how this marketing strategy aligns with your sales funnel?",
      ],
      financial: [
        "How will these financial changes impact your long-term growth projections?",
        "Have you stress-tested these financial assumptions against market downturns?",
        "What contingency plans do you have if these financial targets aren't met?",
      ],
    }

    const sectorQuestions = questions[note.sector] || questions.product
    return sectorQuestions[Math.floor(Math.random() * sectorQuestions.length)]
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

  const handleOpenNestedCanvas = (noteId: string) => {
    // Initialize empty canvas for the note if it doesn't exist
    const updatedHierarchy = { ...canvasHierarchy }
    if (!updatedHierarchy[activeCheckpoint][noteId]) {
      updatedHierarchy[activeCheckpoint][noteId] = []
      setCanvasHierarchy(updatedHierarchy)
    }

    // Navigate to the nested canvas
    setCanvasStack([...canvasStack, noteId])
  }

  const handleNavigateBack = () => {
    if (canvasStack.length > 1) {
      setCanvasStack(canvasStack.slice(0, -1))
    }
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

  const handleApplyAIChanges = (updatedHierarchy: Record<string, Record<string, Note[]>>) => {
    setCanvasHierarchy(updatedHierarchy)
    setIsAIChatOpen(false)
    toast.success("AI suggestions applied to your notes!")
  }

  const currentNotes = getCurrentNotes()
  const currentCanvasTitle =
    canvasStack.length > 1
      ? currentNotes.length > 0
        ? currentNotes[0].parentId
          ? canvasHierarchy[activeCheckpoint][currentNotes[0].parentId]?.find(
              (n) => n.id === canvasStack[canvasStack.length - 1],
            )?.title
          : "Nested Canvas"
        : "Nested Canvas"
      : "Main Canvas"

  // Calculate main content width based on feedback panel state
  const mainContentClass = isFeedbackPanelOpen ? "pr-80" : ""

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
          {canvasStack.length > 1 && (
            <Button variant="ghost" size="sm" onClick={handleNavigateBack} className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <div className="flex items-center">
            <span className="text-sm font-medium">{currentCanvasTitle}</span>
            {canvasStack.map((canvas, index) => {
              if (index === 0) return null
              const parentCanvas = index > 1 ? canvasStack[index - 1] : "root"
              const canvasNote = canvasHierarchy[activeCheckpoint][parentCanvas]?.find((n) => n.id === canvas)
              if (!canvasNote) return null
              return (
                <div key={canvas} className="flex items-center">
                  <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                  <span className="text-sm font-medium">{canvasNote.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={`relative flex-1 transition-all duration-300 ${mainContentClass}`}>
        <div
          ref={canvasRef}
          className="h-full relative bg-gray-50 dark:bg-gray-900 overflow-auto"
          style={{ minHeight: "calc(100vh - 160px)" }}
        >
          {currentNotes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onSelect={() => handleNoteSelect(note.id)}
              onEdit={(updatedNote) => handleNoteEdit(note.id, updatedNote)}
              onDelete={() => handleNoteDelete(note.id)}
              onOpen={() => handleOpenNestedCanvas(note.id)}
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

        {/* Feedback Panel */}
        <FeedbackPanel
          feedbackItems={feedbackItems}
          isOpen={isFeedbackPanelOpen}
          onToggle={() => setIsFeedbackPanelOpen(!isFeedbackPanelOpen)}
        />
      </div>

      {isAIChatOpen && (
        <AIChat
          selectedNotes={currentNotes.filter((note) => note.selected)}
          onClose={() => setIsAIChatOpen(false)}
          onApplyChanges={handleApplyAIChanges}
          currentHierarchy={canvasHierarchy}
        />
      )}
    </div>
  )
}

