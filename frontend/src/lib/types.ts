export type BusinessSector = "inventory" | "manufacturing" | "product" | "human" | "marketing" | "financial"

export interface Note {
  id: string
  title: string
  content: string
  position: { x: number; y: number }
  color: string
  sector: BusinessSector
  selected: boolean
  files: string[]
  parentId: string | null
  zIndex?: number
}

export interface TimelineCheckpoint {
  id: string
  title: string
  date: Date
}

