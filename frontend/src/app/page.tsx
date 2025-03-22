import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Business Empowerment System",
  description: "Canvas-style interface for business management with AI insights",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Dashboard />
    </main>
  )
}

