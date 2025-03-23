"use client"
import { X, MessageSquare, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface FeedbackItem {
  id: string
  message: string
  timestamp: Date
}

interface FeedbackPanelProps {
  feedbackItems: FeedbackItem[]
  isOpen: boolean
  onToggle: () => void
}

export function FeedbackPanel({ feedbackItems, isOpen, onToggle }: FeedbackPanelProps) {
  return (
    <div
      className={cn(
        "fixed right-0 top-[137px] z-30 h-[calc(100vh-137px)] bg-background border-l shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "translate-x-0 w-80" : "translate-x-full w-0",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Business Insights</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4 h-[calc(100%-60px)] overflow-auto">
          {feedbackItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p>No insights yet.</p>
              <p className="text-sm mt-2">Edit your notes to generate business insights.</p>
            </div>
          ) : (
            <div className="space-y-4 pr-2">
              {feedbackItems.map((item) => (
                <FeedbackCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Toggle button that shows when panel is closed */}
      {!isOpen && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onToggle}
          className="absolute top-20 left-0 transform -translate-x-full rounded-r-none shadow-md"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Insights
        </Button>
      )}
    </div>
  )
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
  // Process the message to handle the specific format
  const formatMessage = (message: string) => {
    // Split the message by lines
    const lines = message.split("\n").filter((line) => line.trim() !== "")

    if (lines.length >= 2) {
      // Check if the message follows our expected format
      const changeLine = lines[0]
      const insightLine = lines.find((line) => line.includes("💡 - Question/Insight:"))

      if (changeLine && insightLine) {
        // Extract the insight part (after the colon)
        const insightParts = insightLine.split("💡 - Question/Insight:")
        const insightText = insightParts.length > 1 ? insightParts[1].trim() : insightLine

        return (
          <>
            <p className="text-sm mb-2">{changeLine}</p>
            <div className="border-t border-gray-200 my-2"></div>
            <p className="text-sm">
              <span className="inline-flex items-center">
                <span className="mr-1">💡</span>
                <span className="font-bold">- Question/Insight: </span>
              </span>
              <span className="font-bold">{insightText}</span>
            </p>
          </>
        )
      }
    }

    // Fallback for messages that don't match the expected format
    return <p className="text-sm">{message}</p>
  }

  return (
    <div className="bg-muted/50 rounded-lg p-4 border">
      <div className="text-sm text-muted-foreground mb-1">{item.timestamp.toLocaleString()}</div>
      {formatMessage(item.message)}
    </div>
  )
}

