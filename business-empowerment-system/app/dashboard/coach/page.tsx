"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Calendar, Lightbulb, Send, ThumbsUp, User } from "lucide-react"

export default function AICoachPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AI business coach. How can I help you today with your business journey?",
    },
  ])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = { role: "user", content: message }
    setChatHistory([...chatHistory, userMessage])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question about marketing strategies! For your eco-friendly product line, I recommend focusing on content marketing that highlights your sustainability practices. This approach resonates well with environmentally conscious consumers.",
        "When it comes to pricing, you should consider a value-based strategy rather than competing on cost. Your target market is willing to pay premium prices for products that align with their values.",
        "For new entrepreneurs, I always recommend starting with a minimum viable product (MVP) to test your market assumptions before investing heavily. This allows you to gather customer feedback early and iterate quickly.",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      setChatHistory((prev) => [...prev, { role: "assistant", content: randomResponse }])
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI Business Coach</h1>
        <p className="text-muted-foreground">Get personalized guidance and answers to your business questions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Chat Interface */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Your AI Coach</CardTitle>
              <CardDescription>Ask any business question and get expert guidance</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-start max-w-[80%]">
                      {msg.role === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`rounded-lg p-3 ${
                          msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>

                      {msg.role === "user" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarImage src="/placeholder-user.jpg" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Input
                  placeholder="Type your business question here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Suggested Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setMessage("How do I create an effective marketing plan?")}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Marketing strategies
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setMessage("What pricing model should I use for my product?")}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Pricing models
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setMessage("How can I find reliable suppliers?")}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Supply chain
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setMessage("What legal structure is best for my business?")}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Legal setup
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setMessage("How do I create financial projections?")}
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                Financial planning
              </Button>
            </CardContent>
          </Card>

          {/* Schedule Mentorship */}
          <Card>
            <CardHeader>
              <CardTitle>Connect with a Mentor</CardTitle>
              <CardDescription>Schedule a session with a human expert</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Marketing Expert</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Finance Advisor</p>
                </div>
              </div>

              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learning Resources */}
      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides">Business Guides</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Business Plan Fundamentals"
              description="Learn how to create a comprehensive business plan that attracts investors."
              icon={<BookOpen className="h-5 w-5" />}
            />
            <ResourceCard
              title="Marketing on a Budget"
              description="Effective marketing strategies when you have limited resources."
              icon={<Lightbulb className="h-5 w-5" />}
            />
            <ResourceCard
              title="Financial Management 101"
              description="Basic accounting and financial tracking for new business owners."
              icon={<BookOpen className="h-5 w-5" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Business Plan Template"
              description="A structured template to help you create a comprehensive business plan."
              icon={<BookOpen className="h-5 w-5" />}
            />
            <ResourceCard
              title="Financial Projections Spreadsheet"
              description="Pre-built formulas for creating 3-year financial projections."
              icon={<Lightbulb className="h-5 w-5" />}
            />
            <ResourceCard
              title="Marketing Calendar Template"
              description="Plan and organize your marketing activities effectively."
              icon={<Calendar className="h-5 w-5" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Finding Your First Customers"
              description="Strategies for acquiring your first paying customers."
              icon={<Lightbulb className="h-5 w-5" />}
            />
            <ResourceCard
              title="Pitch Deck Essentials"
              description="How to create a compelling pitch for investors or partners."
              icon={<BookOpen className="h-5 w-5" />}
            />
            <ResourceCard
              title="Social Media Marketing"
              description="Leveraging social platforms to grow your business presence."
              icon={<Lightbulb className="h-5 w-5" />}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ResourceCard({ title, description, icon }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <Button variant="link" className="p-0 h-auto">
            Learn More
          </Button>
          <div className="flex items-center text-xs text-muted-foreground">
            <ThumbsUp className="h-3 w-3 mr-1" />
            <span>24 found helpful</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

