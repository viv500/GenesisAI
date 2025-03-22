import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BusinessSector } from "@/lib/types"

interface AddNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddNote: (title: string, content: string, sector: BusinessSector) => void
}

export function AddNoteDialog({ isOpen, onClose, onAddNote }: AddNoteDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sector, setSector] = useState<BusinessSector>("inventory")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() === "") return
    
    onAddNote(title, content, sector)
    
    // Reset form
    setTitle("")
    setContent("")
    setSector("inventory")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="sector">Business Sector</Label>
              <Select value={sector} onValueChange={(value) => setSector(value as BusinessSector)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inventory">Inventory</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="human">Human Resources</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Description</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter note description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}