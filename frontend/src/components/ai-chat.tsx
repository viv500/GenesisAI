"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Note } from "@/lib/types";

interface AIChatProps {
  selectedNotes: Note[];
  onClose: () => void;
  onApplyChanges: (updatedHierarchy: Record<string, Record<string, Note[]>>) => void;
  currentHierarchy: Record<string, Record<string, Note[]>>; // new prop for the current hierarchy
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIChat({ selectedNotes, onClose, onApplyChanges, currentHierarchy }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I'm your AI business assistant. I can help analyze and provide insights based on your selected business areas: ${selectedNotes
        .map((note) => note.title)
        .join(", ")}. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedChanges, setSuggestedChanges] = useState<Note[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Immediate assistant response to give feedback
      const aiMessage: Message = {
        role: "assistant",
        content: "I am processing your request and updating the canvas hierarchy.",
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Send both the question and the current canvas hierarchy to the endpoint
      const response = await fetch("http://localhost:8000/api/update-hierarchy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          canvasHierarchy: currentHierarchy,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update hierarchy");
      }

      const updatedHierarchy = await response.json();
      
      // Update hierarchy after AI response
      onApplyChanges(updatedHierarchy);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <Button onClick={() => onApplyChanges({})}>Apply Changes</Button>
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
  );
}
