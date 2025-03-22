"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Note } from "@/lib/types"

interface AIChatProps {
  selectedNotes: Note[]
  onClose: () => void
  onApplyChanges: (notes: Note[]) => void
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChat({ selectedNotes, onClose, onApplyChanges }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I'm your AI business assistant. I can help analyze and provide insights based on your selected business areas: ${selectedNotes.map((note) => note.title).join(", ")}. How can I help you today?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedChanges, setSuggestedChanges] = useState<Note[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, selectedNotes)
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse.message }])
      setSuggestedChanges(aiResponse.suggestions)
      setIsLoading(false)
    }, 1500)
  }

  const handleApplyChanges = () => {
    onApplyChanges(suggestedChanges)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl w-[90%] max-w-3xl h-[80%] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Business Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {suggestedChanges.length > 0 && (
          <div className="p-4 border-t bg-muted/50">
            <h3 className="font-medium mb-2">Suggested Changes</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedChanges.map((note) => (
                <div key={note.id} className={`p-2 rounded ${note.color} text-sm`}>
                  {note.title}
                </div>
              ))}
            </div>
            <Button onClick={handleApplyChanges}>Apply Changes</Button>
          </div>
        )}

        <div className="p-4 border-t flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your business areas..."
            className="min-h-[60px] resize-none"
          />
          <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Simulate AI response generation
function generateAIResponse(input: string, selectedNotes: Note[]): { message: string; suggestions: Note[] } {
  const lowerInput = input.toLowerCase()

  // Create a copy of the notes to modify
  const suggestions = JSON.parse(JSON.stringify(selectedNotes)) as Note[]

  let message = ""

  if (lowerInput.includes("improve") || lowerInput.includes("optimize")) {
    message = "Based on my analysis of your selected business areas, here are some optimization suggestions:\n\n"

    suggestions.forEach((note) => {
      if (note.sector === "inventory") {
        note.content +=
          "\n\nAI Suggestion: Consider implementing a just-in-time inventory system to reduce holding costs and improve cash flow."
      } else if (note.sector === "manufacturing") {
        note.content +=
          "\n\nAI Suggestion: Analyze production bottlenecks and implement lean manufacturing principles to increase throughput by 15-20%."
      } else if (note.sector === "product") {
        note.content +=
          "\n\nAI Suggestion: Conduct customer interviews to identify unmet needs and prioritize your product roadmap accordingly."
      } else if (note.sector === "human") {
        note.content +=
          "\n\nAI Suggestion: Implement regular skill development programs and create clear career progression paths to improve employee retention."
      }
    })

    message += suggestions.map((note) => `• ${note.title}: ${note.content.split("\n\nAI Suggestion:")[1]}`).join("\n\n")
    message += "\n\nWould you like me to apply these suggestions to your notes?"
  } else if (lowerInput.includes("analyze") || lowerInput.includes("insights")) {
    message = "Here's my analysis of your selected business areas:\n\n"

    suggestions.forEach((note) => {
      if (note.sector === "inventory") {
        note.content +=
          "\n\nAI Analysis: Your inventory management could benefit from demand forecasting algorithms to reduce stockouts and overstock situations."
      } else if (note.sector === "manufacturing") {
        note.content +=
          "\n\nAI Analysis: Consider implementing predictive maintenance to reduce downtime and extend equipment lifespan."
      } else if (note.sector === "product") {
        note.content +=
          "\n\nAI Analysis: Your product strategy should include competitive analysis and market trend monitoring to stay ahead."
      } else if (note.sector === "human") {
        note.content +=
          "\n\nAI Analysis: Employee engagement surveys and regular feedback sessions can help identify areas for improvement in your human operations."
      }
    })

    message += suggestions.map((note) => `• ${note.title}: ${note.content.split("\n\nAI Analysis:")[1]}`).join("\n\n")
    message += "\n\nWould you like me to apply these insights to your notes?"
  } else {
    message = "I've analyzed your selected business areas and have some general recommendations:\n\n"

    suggestions.forEach((note) => {
      note.content += `\n\nAI Recommendation: Based on industry best practices, consider reviewing and updating your ${note.title.toLowerCase()} strategies quarterly to stay competitive.`
    })

    message += suggestions
      .map(
        (note) =>
          `• ${note.title}: Regular review and optimization of processes can lead to significant efficiency gains.`,
      )
      .join("\n\n")
    message += "\n\nWould you like me to add these recommendations to your notes?"
  }

  return { message, suggestions }
}

