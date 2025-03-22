"use client"

import { MessageSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  onAddNote: () => void
  onOpenAIChat: () => void
  selectedCount: number
}

export function DashboardHeader({ onAddNote, onOpenAIChat, selectedCount }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-background p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Stella AI</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onAddNote}>
            <Plus className="mr-2 h-4 w-4" />
            Add Note
          </Button>
          <Button onClick={onOpenAIChat} disabled={selectedCount === 0} className="relative">
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Assistant
            {selectedCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selectedCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}

