import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, CalendarClock, ChevronRight, LineChart, MessageSquare, Users } from "lucide-react"

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Good morning, John!</h1>
        <p className="text-muted-foreground">Here's what's happening with your business today.</p>
      </div>

      {/* Business Plan Completion */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Your Business Plan</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/plan">
                View full plan <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <CardDescription>Complete all milestones to establish a solid foundation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Overall completion</span>
                <span className="font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Next Steps</h4>

              <div className="border rounded-lg p-3 flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <CalendarClock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Complete market research survey</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Identify your target market and key customer segments
                  </p>
                  <Button size="sm" className="mt-2">
                    Start Now
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-3 flex items-start">
                <div className="min-w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Define your unique value proposition</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    What makes your business different from competitors?
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Market Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.2M</div>
            <p className="text-xs text-muted-foreground mt-1">Estimated total addressable market</p>
            <div className="mt-2 flex items-center text-xs text-emerald-500 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>12% growth YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Business Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68/100</div>
            <p className="text-xs text-muted-foreground mt-1">Based on your business plan completeness</p>
            <div className="mt-2">
              <Progress value={68} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">Pending tasks to complete</p>
            <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">Guides, templates and tools available</p>
            <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs">
              Browse Resources
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Activity Tab */}
      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Business Insights</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
              <CardDescription>Personalized recommendations for your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <LineChart className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Market Opportunity</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our analysis shows a growing demand for eco-friendly products in your target market. Consider
                      highlighting sustainability aspects in your marketing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Pricing Strategy</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your target market and competitor research, a premium pricing strategy with value-added
                      services would position you favorably against competitors.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View All Insights
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="min-w-2 h-full">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="h-full w-px bg-border mx-auto mt-1" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Updated business description</p>
                    <p className="text-xs text-muted-foreground">Today, 9:42 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="min-w-2 h-full">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="h-full w-px bg-border mx-auto mt-1" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Completed competitor analysis</p>
                    <p className="text-xs text-muted-foreground">Yesterday, 3:15 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="min-w-2 h-full">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <div className="h-full w-px bg-border mx-auto mt-1" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Added financial projections</p>
                    <p className="text-xs text-muted-foreground">2 days ago, 11:30 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="min-w-2 h-full">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium">Created business profile</p>
                    <p className="text-xs text-muted-foreground">3 days ago, 2:45 PM</p>
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

