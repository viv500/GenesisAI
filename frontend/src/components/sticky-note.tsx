"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Trash2, Maximize2, Edit, Check, CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Note } from "@/lib/types"

interface StickyNoteProps {
  note: Note
  onSelect: () => void
  onEdit: (note: Partial<Note>) => void
  onDelete: () => void
  onOpen: () => void
}

export function StickyNote({ note, onSelect, onEdit, onDelete, onOpen }: StickyNoteProps) {
  const [position, setPosition] = useState(note.position)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(note.content)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editTitle, setEditTitle] = useState(note.title)

  // Dragging state
  const [isDragging, setIsDragging] = useState(false)
  const [mouseStartPos, setMouseStartPos] = useState({ x: 0, y: 0 })

  // Refs
  const noteRef = useRef<HTMLDivElement>(null)

  // Update local state when props change
  useEffect(() => {
    setPosition(note.position)
    setEditContent(note.content)
    setEditTitle(note.title)
  }, [note.position, note.content, note.title])

  // Mouse down handler - start dragging from anywhere on the note
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start dragging if we're editing or clicking on a button
    if (isEditing || isEditingTitle) return
    if (e.target instanceof HTMLElement) {
      // Don't start dragging if clicking on a button or input
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.closest("button") ||
        e.target.closest("input") ||
        e.target.closest("textarea")
      ) {
        return
      }
    }

    e.preventDefault()
    e.stopPropagation()

    // Set dragging state
    setIsDragging(true)

    // Record initial mouse position
    setMouseStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  // Mouse move handler - update position while dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault()

      // Calculate new position
      const newX = e.clientX - mouseStartPos.x
      const newY = e.clientY - mouseStartPos.y

      // Update local position state
      setPosition({ x: newX, y: newY })
    }
  }

  // Mouse up handler - end dragging and save position
  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault()

      // End dragging state
      setIsDragging(false)

      // Save the final position to parent component
      onEdit({ position: position })
    }
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, mouseStartPos, position])

  // Handle content editing
  const handleStartEditing = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSaveEditing = () => {
    onEdit({ content: editContent })
    setIsEditing(false)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value)
  }

  const handleContentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false)
      setEditContent(note.content) // Reset to original content
    } else if (e.key === 'Enter' && e.ctrlKey) {
      handleSaveEditing()
    }
  }

  // Handle title editing
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }

  const handleSaveTitle = () => {
    onEdit({ title: editTitle })
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditingTitle(false)
      setEditTitle(note.title) // Reset to original title
    } else if (e.key === 'Enter') {
      handleSaveTitle()
    }
  }

  // Handle selection via checkbox
  const handleSelectCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect()
  }

  // Handle opening nested canvas
  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    onOpen()
  }

  return (
    <div
      ref={noteRef}
      className={`absolute w-80 rounded-md shadow-md transition-shadow ${note.color} ${
        note.selected ? "ring-2 ring-primary shadow-lg" : ""
      } ${isDragging ? "cursor-grabbing shadow-xl z-50" : "cursor-grab"}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 50 : note.selected ? 40 : note.zIndex || 1,
        transition: isDragging ? "none" : "box-shadow 0.2s ease",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="p-3 font-medium border-b border-black/10 flex justify-between items-center">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0" onClick={handleSelectCheckbox}>
            {note.selected ? (
              <CheckSquare className="h-5 w-5 text-primary cursor-pointer" />
            ) : (
              <Square className="h-5 w-5 cursor-pointer" />
            )}
          </div>

          {isEditingTitle ? (
            <input
              type="text"
              className="bg-transparent border-b border-black/20 focus:outline-none px-1 w-full"
              value={editTitle}
              onChange={handleTitleChange}
              onBlur={handleSaveTitle}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <h3
              className="cursor-pointer hover:underline truncate"
              onClick={(e) => {
                e.stopPropagation()
                setIsEditingTitle(true)
              }}
            >
              {note.title}
            </h3>
          )}
        </div>

        <div className="flex gap-1 shrink-0">
          {isEditing ? (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleSaveEditing}>
              <Check className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleStartEditing}>
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleOpen}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 min-h-[150px]">
        {isEditing ? (
          <textarea
            className="w-full h-full min-h-[150px] bg-transparent resize-none focus:outline-none"
            value={editContent}
            onChange={handleContentChange}
            onKeyDown={handleContentKeyDown}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
        )}
      </div>

      {note.files.length > 0 && (
        <div className="px-4 pb-3 text-xs text-gray-600">
          {note.files.length} file{note.files.length !== 1 ? "s" : ""} attached
        </div>
      )}
    </div>
  )
}

