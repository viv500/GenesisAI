"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TimelineCheckpoint } from "@/lib/types"

interface TimelineProps {
  checkpoints: TimelineCheckpoint[]
  activeCheckpoint: string
  onSelectCheckpoint: (id: string) => void
  onAddCheckpoint: () => void
}

export function Timeline({ checkpoints, activeCheckpoint, onSelectCheckpoint, onAddCheckpoint }: TimelineProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollAmount = 200

  const handleScrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - scrollAmount))
  }

  const handleScrollRight = () => {
    setScrollPosition(scrollPosition + scrollAmount)
  }

  return (
    <div className="border-b bg-background">
      <div className="container mx-auto py-2 flex items-center">
        <Button variant="ghost" size="icon" className="shrink-0" onClick={handleScrollLeft}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 overflow-hidden relative">
          <div
            className="flex items-center gap-2 transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {checkpoints.map((checkpoint) => (
              <Button
                key={checkpoint.id}
                variant={activeCheckpoint === checkpoint.id ? "default" : "outline"}
                className="shrink-0 whitespace-nowrap"
                onClick={() => onSelectCheckpoint(checkpoint.id)}
              >
                {checkpoint.title}
              </Button>
            ))}
          </div>
        </div>

        <Button variant="ghost" size="icon" className="shrink-0 mr-2" onClick={handleScrollRight}>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" className="shrink-0 flex items-center gap-1" onClick={onAddCheckpoint}>
          <Plus className="h-4 w-4" />
          Add Checkpoint
        </Button>
      </div>
    </div>
  )
}

