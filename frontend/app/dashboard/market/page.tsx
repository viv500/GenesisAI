"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LineChart, BarChart, DollarSign, Loader2, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MarketInsightsPage() {
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState("global")

  const handleRegionChange = (value) => {
    setLoading(true)
    setRegion(value)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Market Insights</h1>
        <p className="text-muted-foreground">Analyze your market and competitors to make data-driven decisions</p>
      </div>

      {/* Market Overview */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center pb-2">
          <div>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Key trends and insights for your industry</CardDescription>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="africa">Africa</SelectItem>
              </SelectContent>
            </Select>
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <InsightCard
              title="Market Size"
              value="$4.2B"
              trend="up"
              percentage="12.4%"
              description="Estimated global market size for sustainable household products"
              icon={<DollarSign className="h-5 w-5" />}
            />
            <InsightCard
              title="Growth Rate"
              value="8.2%"
              trend="up"
              percentage="1.3%"
              description="Annual growth rate for eco-friendly products"
              icon={<LineChart className="h-5 w-5" />}
            />
            <InsightCard
              title="Consumer Demand"
              value="High"
              trend="up"
              percentage="15%"
              description="Increase in search volume for sustainable products"
              icon={<Users className="h-5 w-5" />}
            />
            <InsightCard
              title="Price Sensitivity"
              value="Medium"
              trend="down"
              percentage="3.2%"
              description="Decrease in price sensitivity for eco-products"
              icon={<BarChart className="h-5 w-5" />}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Market Trends</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b bg-muted/50">
                  <h4 className="font-medium">Consumer Preferences</h4>
                </div>
                <div className="p-4">
                  <div className="h-60 bg-muted/30 rounded-md flex items-center justify-center">
                    <div className="text-center p-4">
                      {/* Placeholder for chart */}
                      <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Consumer preference chart</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">
                      <Badge className="mr-2">Trending Up</Badge> Plastic-free packaging
                    </p>
                    <p className="text-sm">
                      <Badge className="mr-2">Trending Up</Badge> Natural ingredients
                    </p>
                    <p className="text-sm">
                      <Badge className="mr-2">Stable</Badge> Eco-certifications
                    </p>
                    <p className="text-sm">
                      <Badge variant="outline" className="mr-2">
                        Trending Down
                      </Badge>{" "}
                      Multi-purpose products
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card overflow-hidden">
                <div className="px-4 py-3 border-b bg-muted/50">
                  <h4 className="font-medium">Regulatory Landscape</h4>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md text-sm">
                      <p className="font-medium mb-1">Coming in 2025: Stricter packaging regulations</p>
                      <p>New regulations will require at least 50% recycled content in packaging.</p>
                    </div>
                    <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
                      <p className="font-medium mb-1">Tax incentives for sustainable businesses</p>
                      <p>Government incentives for businesses with certified sustainable practices.</p>
                    </div>
                    <div className="p-3 bg-blue-100 text-blue-800 rounded-md text-sm">
                      <p className="font-medium mb-1">Carbon footprint reporting</p>
                      <p>Voluntary now, but likely to become mandatory for businesses over $1M revenue.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Competitor Overview</TabsTrigger>
          <TabsTrigger value="swot">SWOT Analysis</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Competitors</CardTitle>
              <CardDescription>Analysis of main players in your market segment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <CompetitorCard
                  name="EcoClean Solutions"
                  description="Established brand with wide distribution in major retailers."
                  strengths={["Strong brand recognition", "Wide product range", "Retail presence"]}
                  weaknesses={["Higher price point", "Mixed sustainability credentials"]}
                  marketShare={35}
                />

                <CompetitorCard
                  name="GreenLife Essentials"
                  description="Direct-to-consumer brand focused on zero-waste products."
                  strengths={["Strong online presence", "Dedicated customer base", "Innovative products"]}
                  weaknesses={["Limited distribution", "Higher shipping costs"]}
                  marketShare={18}
                />

                <CompetitorCard
                  name="Pure Home"
                  description="New entrant focusing on premium eco-friendly home goods."
                  strengths={["Premium branding", "High-quality products", "Strong social media"]}
                  weaknesses={["Limited product range", "New to market"]}
                  marketShare={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SWOT Analysis</CardTitle>
              <CardDescription>Evaluate your position in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Strengths</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Fully sustainable supply chain with local sourcing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Innovative product designs that solve common problems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Strong digital marketing expertise</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Lower overhead costs compared to established competitors</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-800 mb-2">Weaknesses</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Limited initial capital for large-scale marketing</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>No established customer base or brand recognition</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Higher production costs due to sustainable materials</span>
                    </li>
                    <li className="flex items-start">
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Limited team size to handle multiple business functions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Opportunities</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start">
                      <LightbulbIcon className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Growing consumer awareness of environmental issues</span>
                    </li>
                    <li className="flex items-start">
                      <LightbulbIcon className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Potential partnerships with eco-focused retailers</span>
                    </li>
                    <li className="flex items-start">
                      <LightbulbIcon className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Emerging markets in sustainable home products</span>
                    </li>
                    <li className="flex items-start">
                      <LightbulbIcon className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Government incentives for sustainable businesses</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                  <h3 className="font-semibold text-rose-800 mb-2">Threats</h3>
                  <ul className="space-y-2 text-sm text-rose-800">
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Large competitors entering the eco-friendly market</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Economic downturns affecting premium product purchases</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Supply chain disruptions affecting material availability</span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>"Greenwashing" by competitors diluting the market</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Comparison</CardTitle>
              <CardDescription>Analyze your price positioning relative to competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product Category</th>
                      <th className="text-left py-3 px-4">Your Business</th>
                      <th className="text-left py-3 px-4">EcoClean Solutions</th>
                      <th className="text-left py-3 px-4">GreenLife Essentials</th>
                      <th className="text-left py-3 px-4">Industry Average</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">All-Purpose Cleaner</td>
                      <td className="py-3 px-4">$12.99</td>
                      <td className="py-3 px-4">$14.99</td>
                      <td className="py-3 px-4">$11.99</td>
                      <td className="py-3 px-4">$9.99</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Reusable Food Wraps</td>
                      <td className="py-3 px-4">$18.99</td>
                      <td className="py-3 px-4">$21.99</td>
                      <td className="py-3 px-4">$16.99</td>
                      <td className="py-3 px-4">$14.99</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Bamboo Toilet Paper (6 pack)</td>
                      <td className="py-3 px-4">$8.99</td>
                      <td className="py-3 px-4">$10.99</td>
                      <td className="py-3 px-4">$9.49</td>
                      <td className="py-3 px-4">$7.99</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Compostable Trash Bags</td>
                      <td className="py-3 px-4">$15.99</td>
                      <td className="py-3 px-4">$17.99</td>
                      <td className="py-3 px-4">$14.99</td>
                      <td className="py-3 px-4">$12.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Pricing Analysis</h3>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Premium Positioning</h4>
                    <p className="text-sm text-muted-foreground">
                      Your prices are positioned slightly above the industry average but below the premium market leader
                      (EcoClean Solutions). This reflects your quality positioning while remaining competitive.
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Consumer Willingness to Pay</h4>
                    <p className="text-sm text-muted-foreground">
                      Market research shows that eco-conscious consumers are willing to pay 15-20% more for sustainable
                      products, making your pricing strategy viable for your target market.
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider tiered pricing options to capture different market segments. A premium line with enhanced
                      features could command higher prices, while a basic line could compete more directly on price.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InsightCard({ title, value, trend, percentage, description, icon }) {
  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
            {percentage}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function CompetitorCard({ name, description, strengths, weaknesses, marketShare }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="mt-3 md:mt-0">
          <Badge variant="outline" className="text-lg font-semibold">
            {marketShare}% Market Share
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-medium mb-2 text-emerald-600">Strengths</h4>
          <ul className="space-y-1">
            {strengths.map((strength, index) => (
              <li key={index} className="text-sm flex items-start">
                <PlusCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-rose-600">Weaknesses</h4>
          <ul className="space-y-1">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="text-sm flex items-start">
                <MinusCircle className="h-3.5 w-3.5 text-rose-500 mr-2 mt-0.5" />
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Missing component imports
const CheckCircle2 = ({ className }) => {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

const AlertCircle = ({ className }) => {
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
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

const LightbulbIcon = ({ className }) => {
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
      <path d="M9 18h6M12 6V2M12 22v-4M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
    </svg>
  )
}

const AlertTriangle = ({ className }) => {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

const PlusCircle = ({ className }) => {
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
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

const MinusCircle = ({ className }) => {
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
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

