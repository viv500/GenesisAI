"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community & Mentorship</h1>
        <p className="text-muted-foreground">
          Connect with mentors and fellow entrepreneurs
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto">
          <TabsTrigger value="forum" className="py-2 text-sm">Entrepreneur Forum</TabsTrigger>
          <TabsTrigger value="mentors" className="py-2 text-sm">Find a Mentor</TabsTrigger>
          <TabsTrigger value="events" className="py-2 text-sm">Events & Webinars</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forum" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center pb-2">
              <div>
                <CardTitle>Entrepreneur Forum</CardTitle>
                <CardDescription>Connect and learn from fellow business owners</CardDescription>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-8 w-56" placeholder="Search discussions..." />
                </div>
                <Button>New Discussion</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex space-x-3">
                    <Badge>Popular</Badge>
                    <Badge variant="outline">Marketing</Badge>
                    <Badge variant="outline">Social Media</Badge>
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Latest
                    </Button>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Top
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <ForumPost 
                    title="What's your most effective low-cost marketing strategy?" 
                    author={{
                      name: "Sarah Johnson",
                      avatar: "/placeholder.svg?height=40&width=40",
                      role: "E-commerce Founder"
                    }}
                    replies={12}
                    likes={28}
                    timeAgo="2 hours ago"
                  />
                  
                  <ForumPost 
                    title="Seeking advice on payment processors for small business" 
                    author={{
                      name: "Michael Chen",
                      avatar: "/placeholder.svg?height=40&width=40",
                      role: "Tech Startup"
                    }}
                    replies={8}
                    likes={15}
                    timeAgo="5 hours ago"
                  />
                  
                  <ForumPost 
                    title="How to handle customer returns and refunds policy?" 
                    author={{
                      name: "Aisha Williams",
                      avatar: "/placeholder.svg?height=40&width=40",
                      role: "Retail Business"
                    }}
                    replies={14}
                    likes={19}
                    timeAgo="1 day ago"
                  />
                  
                  <ForumPost 
                    title="Best practices for hiring your first employee" 
                    author={{
                      name: "Juan Rodriguez",
                      avatar: "/placeholder.svg?height=40&width=40",
                      role: "Service Business"
                    }}
                    replies={22}
                    likes={37}
                    timeAgo="2 days ago"
                  />
                  
                  <ForumPost 
                    title="What's your experience with eco-friendly packaging?" 
                    author={{
                      name: "Emma Turner",
                \

