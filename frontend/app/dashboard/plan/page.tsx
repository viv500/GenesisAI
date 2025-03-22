"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CalendarClock, CheckCircle, ChevronRight, Download, LineChart, Pencil, PlayCircle, Users } from "lucide-react"

export default function BusinessPlanPage() {
  const [editMode, setEditMode] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Business Plan</h1>
          <p className="text-muted-foreground">AI-generated roadmap based on your inputs</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
            <Pencil className="mr-2 h-4 w-4" />
            {editMode ? "View Mode" : "Edit Plan"}
          </Button>
        </div>
      </div>

      {/* Overall progress */}
      <Card>
        <CardHeader>
          <CardTitle>Business Plan Completion</CardTitle>
          <CardDescription>Track your progress towards a complete business plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Overall progress</span>
                <span className="font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ProgressCard
                title="Executive Summary"
                progress={80}
                completed="4/5"
                icon={<LineChart className="h-5 w-5" />}
              />
              <ProgressCard
                title="Market Analysis"
                progress={50}
                completed="2/4"
                icon={<Users className="h-5 w-5" />}
              />
              <ProgressCard
                title="Financial Plan"
                progress={30}
                completed="3/10"
                icon={<CalendarClock className="h-5 w-5" />}
              />
              <ProgressCard
                title="Marketing Strategy"
                progress={25}
                completed="1/4"
                icon={<PlayCircle className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Plan Content */}
      <Tabs defaultValue="plan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plan">Business Plan</TabsTrigger>
          <TabsTrigger value="actions">Action Items</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="plan" className="space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-muted px-6 py-3 flex items-center justify-between border-b">
              <h3 className="font-semibold">Eco-Friendly Home Products</h3>
              <Badge>Retail</Badge>
            </div>

            <Accordion type="single" collapsible className="px-6 py-3">
              <AccordionItem value="executive-summary">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>Executive Summary</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {editMode ? (
                    <textarea
                      className="w-full h-32 p-2 border rounded-md"
                      defaultValue="Eco-Friendly Home Products (EFHP) will provide sustainable, environmentally friendly household products to environmentally conscious consumers. Our product line will include biodegradable cleaning supplies, reusable alternatives to single-use items, and sustainably sourced home decor. With the growing environmental awareness and demand for sustainable products, EFHP is positioned to capitalize on this expanding market."
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <p>
                        Eco-Friendly Home Products (EFHP) will provide sustainable, environmentally friendly household
                        products to environmentally conscious consumers. Our product line will include biodegradable
                        cleaning supplies, reusable alternatives to single-use items, and sustainably sourced home
                        decor. With the growing environmental awareness and demand for sustainable products, EFHP is
                        positioned to capitalize on this expanding market.
                      </p>
                      <p>
                        The company will initially focus on direct-to-consumer e-commerce sales, with plans to expand
                        into wholesale partnerships with local eco-focused retail stores. EFHP aims to become a trusted
                        brand for consumers seeking to reduce their environmental impact without sacrificing quality or
                        convenience.
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="market-analysis">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 rounded-full border border-orange-500" />
                    <span>Market Analysis</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {editMode ? (
                    <textarea
                      className="w-full h-32 p-2 border rounded-md"
                      defaultValue="The market for eco-friendly household products has seen significant growth in recent years, with consumers increasingly prioritizing sustainable options. According to market research, the global green cleaning products market is expected to reach $11.6 billion by 2029, growing at a CAGR of 4.2%."
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none">
                      <p>
                        The market for eco-friendly household products has seen significant growth in recent years, with
                        consumers increasingly prioritizing sustainable options. According to market research, the
                        global green cleaning products market is expected to reach $11.6 billion by 2029, growing at a
                        CAGR of 4.2%.
                      </p>
                      <p>
                        <strong>Target Market:</strong> Primary demographic consists of environmentally conscious
                        consumers aged 25-45, with medium to high income levels, located in urban and suburban areas.
                        This demographic is willing to pay premium prices for products that align with their values and
                        help reduce their environmental footprint.
                      </p>
                      <p>
                        <strong>Competitors:</strong> Major players in the market include established brands like
                        Seventh Generation and Method, as well as newer entrants focused on plastic-free alternatives.
                        EFHP will differentiate through locally sourced materials, plastic-free packaging, and
                        educational content that helps consumers adopt more sustainable lifestyles.
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="product-line">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 rounded-full border border-yellow-500" />
                    <span>Product Line & Services</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    <p>
                      <strong>Initial Product Categories:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>Cleaning Products:</strong> Plant-based, biodegradable cleaning solutions for kitchen,
                        bathroom, and general household use.
                      </li>
                      <li>
                        <strong>Reusable Alternatives:</strong> Cloth napkins, beeswax food wraps, silicone food
                        storage, and reusable produce bags.
                      </li>
                      <li>
                        <strong>Home Essentials:</strong> Bamboo toilet paper, recycled paper towels, compostable
                        garbage bags.
                      </li>
                    </ul>
                    <p>
                      <strong>Future Expansion:</strong> Home décor made from sustainable materials, personal care
                      products, and subscription boxes.
                    </p>
                    <p>
                      <strong>Value-Added Services:</strong> Educational content on sustainable living, product refill
                      stations in select locations, and recycling program for product packaging.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="marketing-strategy">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 rounded-full border" />
                    <span>Marketing & Sales Strategy</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    <p>
                      <strong>Digital Marketing:</strong> Content marketing focused on sustainability education, social
                      media presence highlighting product benefits and customer testimonials, and email marketing with
                      eco-living tips.
                    </p>
                    <p>
                      <strong>Sales Channels:</strong>
                    </p>
                    <ul>
                      <li>
                        <strong>E-commerce:</strong> Branded website with direct sales and educational content.
                      </li>
                      <li>
                        <strong>Marketplace Presence:</strong> Listings on eco-friendly marketplaces and general
                        e-commerce platforms.
                      </li>
                      <li>
                        <strong>Local Partnerships:</strong> Wholesale relationships with local zero-waste shops and
                        eco-conscious retailers.
                      </li>
                    </ul>
                    <p>
                      <strong>Community Building:</strong> Sponsorship of local environmental initiatives, workshops on
                      sustainable living, and partnership with environmental nonprofits.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="operations">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 rounded-full border" />
                    <span>Operations Plan</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    <p>
                      <strong>Supply Chain:</strong> Sourcing from local and ethical suppliers with transparent
                      practices, prioritizing materials with minimal environmental impact.
                    </p>
                    <p>
                      <strong>Facilities:</strong> Initial home-based operation with plans to move to a small
                      warehouse/production space within the first year.
                    </p>
                    <p>
                      <strong>Inventory Management:</strong> Just-in-time approach to minimize storage needs and reduce
                      waste, with regular inventory audits to optimize stock levels.
                    </p>
                    <p>
                      <strong>Shipping & Fulfillment:</strong> Eco-friendly packaging using recycled and compostable
                      materials, carbon-neutral shipping options, and local delivery services where available.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="financial-plan">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <div className="h-4 w-4 mr-2 rounded-full border" />
                    <span>Financial Plan</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    <p>
                      <strong>Startup Costs:</strong> Estimated $25,000 including initial inventory, website
                      development, packaging materials, and marketing expenses.
                    </p>
                    <p>
                      <strong>Revenue Projections:</strong>
                    </p>
                    <ul>
                      <li>Year 1: $120,000</li>
                      <li>Year 2: $250,000</li>
                      <li>Year 3: $425,000</li>
                    </ul>
                    <p>
                      <strong>Pricing Strategy:</strong> Premium pricing reflecting product quality and sustainable
                      nature, with competitive analysis showing room for 15-20% markup over conventional alternatives.
                    </p>
                    <p>
                      <strong>Funding Requirements:</strong> Initial self-funding of $15,000 with additional $10,000
                      needed from external sources (family investment or small business loan).
                    </p>
                    <p>
                      <strong>Break-even Analysis:</strong> Expected to break even after 14 months of operation, with
                      positive cash flow maintained through careful inventory management.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Actions</CardTitle>
              <CardDescription>Your priority tasks to complete next</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ActionItem
                  title="Complete market research survey"
                  description="Identify customer segments and preferences"
                  dueDate="Apr 15"
                  priority="High"
                  completed={false}
                />
                <ActionItem
                  title="Source eco-friendly packaging suppliers"
                  description="Find 3-5 options for sustainable packaging"
                  dueDate="Apr 20"
                  priority="Medium"
                  completed={false}
                />
                <ActionItem
                  title="Develop initial product designs"
                  description="Create mockups for the first product line"
                  dueDate="Apr 25"
                  priority="Medium"
                  completed={false}
                />
                <ActionItem
                  title="Register business name"
                  description="Complete legal registration with local authorities"
                  dueDate="Apr 10"
                  priority="High"
                  completed={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Milestones</CardTitle>
              <CardDescription>Track your key business milestones and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l border-border">
                <div className="space-y-8">
                  <Milestone
                    title="Business Concept & Planning"
                    date="March 2024"
                    status="completed"
                    description="Define your business idea, target market, and initial product offerings."
                  />
                  <Milestone
                    title="Business Registration & Setup"
                    date="April 2024"
                    status="in-progress"
                    description="Register your business name, set up bank accounts, and establish your legal structure."
                  />
                  <Milestone
                    title="Product Development"
                    date="May-June 2024"
                    status="upcoming"
                    description="Source materials, create prototypes, and finalize your first product line."
                  />
                  <Milestone
                    title="Website & Marketing Launch"
                    date="July 2024"
                    status="upcoming"
                    description="Build your e-commerce website and implement your initial marketing strategy."
                  />
                  <Milestone
                    title="First Sales & Customer Acquisition"
                    date="August 2024"
                    status="upcoming"
                    description="Begin selling products and establish your customer base."
                  />
                  <Milestone
                    title="Expansion to Retail Partners"
                    date="Q4 2024"
                    status="upcoming"
                    description="Develop wholesale relationships with local retail partners."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProgressCard({ title, progress, completed, icon }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">{icon}</div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{completed} tasks</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  )
}

function ActionItem({ title, description, dueDate, priority, completed }) {
  return (
    <div className={`flex items-start p-3 rounded-lg border ${completed ? "bg-muted/50" : "bg-card"}`}>
      <div className="flex-shrink-0 mr-3">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            completed ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
          }`}
        >
          {completed && <CheckCircle className="h-3 w-3" />}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>{title}</h4>
          <Badge variant={priority === "High" ? "destructive" : "outline"}>{priority}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="flex items-center text-xs">
          <CalendarClock className="h-3 w-3 mr-1" />
          <span>Due: {dueDate}</span>
        </div>
      </div>
    </div>
  )
}

function Milestone({ title, date, status, description }) {
  return (
    <div className="relative">
      <div className="absolute -left-10 mt-1">
        <div
          className={`w-4 h-4 rounded-full border-2 ${
            status === "completed"
              ? "bg-primary border-primary"
              : status === "in-progress"
                ? "bg-amber-500 border-amber-500"
                : "bg-muted border-muted-foreground"
          }`}
        />
      </div>
      <div>
        <div className="flex items-center mb-1">
          <h4 className="font-medium">{title}</h4>
          <Badge
            className="ml-2"
            variant={status === "completed" ? "default" : status === "in-progress" ? "outline" : "secondary"}
          >
            {status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "Upcoming"}
          </Badge>
        </div>
        <p className="text-sm font-medium text-muted-foreground mb-2">{date}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        {status === "completed" && (
          <Button variant="link" size="sm" className="px-0 py-1 h-auto text-sm">
            View Details
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        )}
        {status === "in-progress" && (
          <Button variant="outline" size="sm" className="mt-2">
            Continue Working
          </Button>
        )}
      </div>
    </div>
  )
}

