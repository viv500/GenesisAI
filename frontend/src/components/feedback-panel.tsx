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
        "fixed right-0 top-[137px] z-30 h-[calc(100vh-137px)] bg-background border-l shadow-lg transition-all duration-300 ease-in-out",
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

        <ScrollArea className="flex-1 p-4">
          {feedbackItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p>No insights yet.</p>
              <p className="text-sm mt-2">Edit your notes to generate business insights.</p>
            </div>
          ) : (
            <div className="space-y-4">
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
  return (
    <div className="bg-muted/50 rounded-lg p-4 border">
      <div className="text-sm text-muted-foreground mb-1">{item.timestamp.toLocaleString()}</div>
      <p className="text-sm">{item.message}</p>
    </div>
  )
}

