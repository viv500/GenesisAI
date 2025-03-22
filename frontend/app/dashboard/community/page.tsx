"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MessageSquare, Search, ThumbsUp, User } from 'lucide-react'

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
                      avatar: "/placeholder.svg?height=40&width=40",
                      role: "Sustainable Products"
                    }}
                    replies={16}
                    likes={24}
                    timeAgo="3 days ago"
                  />
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button variant="outline">Load More Discussions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mentors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Find a Mentor</CardTitle>
              <CardDescription>Connect with experienced entrepreneurs who can guide you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <MentorCard 
                  name="David Wilson"
                  expertise="E-commerce & Digital Marketing"
                  experience="15+ years"
                  avatar="/placeholder.svg?height=80&width=80"
                  availability="Available next week"
                />
                
                <MentorCard 
                  name="Maria Garcia"
                  expertise="Sustainable Business Models"
                  experience="8+ years"
                  avatar="/placeholder.svg?height=80&width=80"
                  availability="Available tomorrow"
                />
                
                <MentorCard 
                  name="James Lee"
                  expertise="Tech Startups & Funding"
                  experience="12+ years"
                  avatar="/placeholder.svg?height=80&width=80"
                  availability="Available this week"
                />
                
                <MentorCard 
                  name="Priya Sharma"
                  expertise="Product Development"
                  experience="10+ years"
                  avatar="/placeholder.svg?height=80&width=80"
                  availability="Available next week"
                />
                
                <MentorCard 
                  name="Robert Johnson"
                  expertise="Financial Planning"
                  experience="20+ years"
                  avatar="/placeholder.svg?height=80&width=80"
                  availability="Limited availability"
                />
                
                <MentorCard 
                  name="Sophia Chen"
                  expertise="Retail & Supply Chain"
                  experience="15+ years"
                  avatar="/placeholder.svg?height=80&width=80"
                  availability="Available this month"
                />
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Mentors</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events & Webinars</CardTitle>
              <CardDescription>Learn and network with other entrepreneurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <EventCard 
                  title="Marketing on a Budget: Strategies for New Businesses"
                  date="April 15, 2024"
                  time="2:00 PM - 3:30 PM EST"
                  speaker="Sarah Johnson"
                  type="Webinar"
                  attendees={42}
                />
                
                <EventCard 
                  title="Sustainable Business Practices Workshop"
                  date="April 22, 2024"
                  time="10:00 AM - 12:00 PM EST"
                  speaker="Maria Garcia"
                  type="Workshop"
                  attendees={28}
                />
                
                <EventCard 
                  title="Funding Options for Early-Stage Startups"
                  date="May 5, 2024"
                  time="1:00 PM - 2:30 PM EST"
                  speaker="James Lee"
                  type="Panel Discussion"
                  attendees={56}
                />
                
                <EventCard 
                  title="Legal Essentials for Small Business Owners"
                  date="May 12, 2024"
                  time="11:00 AM - 12:30 PM EST"
                  speaker="Robert Johnson"
                  type="Webinar"
                  attendees={35}
                />
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">View All Events</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ForumPost({ title, author, replies, likes, timeAgo }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-start">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium hover:text-primary cursor-pointer">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <span className="font-medium text-foreground">{author.name}</span>
            <span className="mx-2">·</span>
            <span>{author.role}</span>
            <span className="mx-2">·</span>
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-3 text-sm text-muted-foreground">
        <div className="flex items-center mr-4">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{replies} replies</span>
        </div>
        <div className="flex items-center">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>{likes} likes</span>
        </div>
      </div>
    </div>
  )
}

function MentorCard({ name, expertise, experience, avatar, availability }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <div className="flex items-center mb-3">
        <Avatar className="h-14 w-14 mr-3">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{expertise}</p>
        </div>
      </div>
      <div className="space-y-2 mb-4 flex-1">
        <div className="flex items-center text-sm">
          <Badge variant="outline" className="mr-2">
            {experience}
          </Badge>
          <span className="text-muted-foreground">experience</span>
        </div>
        <p className="text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 inline mr-1" />
          {availability}
        </p>
      </div>
      <Button className="w-full">Request Mentorship</Button>
    </div>
  )
}

function EventCard({ title, date, time, speaker, type, attendees }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">Presented by {speaker}</p>
        </div>
        <Badge>{type}</Badge>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-sm">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>{attendees} attending</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button className="flex-1">Register</Button>
        <Button variant="outline" className="flex-1">Add to Calendar</Button>
      </div>
    </div>
  )
}

// Missing component imports
const Clock = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
