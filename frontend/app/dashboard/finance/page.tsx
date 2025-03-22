"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Download, LineChart, Plus, Save } from "lucide-react"

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState("forecasting")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Financial Tools</h1>
        <p className="text-muted-foreground">Plan your finances and get legal guidance for your business</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="forecasting" className="py-2 text-sm">
            Financial Forecasting
          </TabsTrigger>
          <TabsTrigger value="budget" className="py-2 text-sm">
            Budget Planner
          </TabsTrigger>
          <TabsTrigger value="funding" className="py-2 text-sm">
            Funding Options
          </TabsTrigger>
          <TabsTrigger value="legal" className="py-2 text-sm">
            Legal Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Expense Forecast</CardTitle>
              <CardDescription>Estimate your business's financial performance over the next year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Revenue Sources</h3>

                  <div className="space-y-4">
                    <div className="grid gap-3">
                      <div className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <DollarSign className="h-4 w-4 text-primary" />
                            </div>
                            <Label htmlFor="product-sales">Product Sales</Label>
                          </div>
                          <Select defaultValue="monthly">
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="annually">Annually</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center">
                          <Input id="product-sales" placeholder="0.00" className="mr-2" defaultValue="5000" />
                          <span className="text-muted-foreground text-sm">USD</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <Label htmlFor="wholesale">Wholesale Revenue</Label>
                        </div>
                        <div className="flex items-center">
                          <Input id="wholesale" placeholder="0.00" className="mr-2" defaultValue="2500" />
                          <span className="text-muted-foreground text-sm">USD</span>
                        </div>
                      </div>

                      <Button variant="outline" className="flex items-center justify-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Revenue Stream
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Expenses</h3>

                  <div className="space-y-4">
                    <div className="grid gap-3">
                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <Label htmlFor="materials">Materials & Inventory</Label>
                        </div>
                        <div className="flex items-center">
                          <Input id="materials" placeholder="0.00" className="mr-2" defaultValue="2000" />
                          <span className="text-muted-foreground text-sm">USD</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <Label htmlFor="marketing">Marketing</Label>
                        </div>
                        <div className="flex items-center">
                          <Input id="marketing" placeholder="0.00" className="mr-2" defaultValue="1000" />
                          <span className="text-muted-foreground text-sm">USD</span>
                        </div>
                      </div>

                      <div className="border rounded-md p-3">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <Label htmlFor="operations">Operations</Label>
                        </div>
                        <div className="flex items-center">
                          <Input id="operations" placeholder="0.00" className="mr-2" defaultValue="1500" />
                          <span className="text-muted-foreground text-sm">USD</span>
                        </div>
                      </div>

                      <Button variant="outline" className="flex items-center justify-center">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Expense
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">12-Month Forecast</h3>
                <div className="h-64 border rounded-md bg-muted/20 flex items-center justify-center p-4">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Revenue and expense forecast chart</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Projected Monthly Revenue</h4>
                  <p className="text-2xl font-bold">$7,500</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Projected Monthly Expenses</h4>
                  <p className="text-2xl font-bold">$4,500</p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Projected Monthly Profit</h4>
                  <p className="text-2xl font-bold text-emerald-600">$3,000</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Forecast
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Budget Planner</CardTitle>
              <CardDescription>Create a monthly budget to manage your business finances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-4">Startup Costs</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="equipment">Equipment & Tools</Label>
                      <Input id="equipment" placeholder="0.00" className="w-32" defaultValue="4500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="legal">Legal & Registration</Label>
                      <Input id="legal" placeholder="0.00" className="w-32" defaultValue="1200" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="branding">Branding & Website</Label>
                      <Input id="branding" placeholder="0.00" className="w-32" defaultValue="2000" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inventory">Initial Inventory</Label>
                      <Input id="inventory" placeholder="0.00" className="w-32" defaultValue="5000" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="other">Other Costs</Label>
                      <Input id="other" placeholder="0.00" className="w-32" defaultValue="1000" />
                    </div>
                    <div className="pt-3 border-t mt-3 flex items-center justify-between font-semibold">
                      <span>Total Startup Costs</span>
                      <span>$13,700</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-4">Monthly Operating Budget</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="m-materials">Materials & Supplies</Label>
                      <Input id="m-materials" placeholder="0.00" className="w-32" defaultValue="2000" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="m-labor">Labor & Contractors</Label>
                      <Input id="m-labor" placeholder="0.00" className="w-32" defaultValue="1500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="m-marketing">Marketing & Advertising</Label>
                      <Input id="m-marketing" placeholder="0.00" className="w-32" defaultValue="1000" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="m-utilities">Utilities & Rent</Label>
                      <Input id="m-utilities" placeholder="0.00" className="w-32" defaultValue="800" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="m-software">Software & Services</Label>
                      <Input id="m-software" placeholder="0.00" className="w-32" defaultValue="200" />
                    </div>
                    <div className="pt-3 border-t mt-3 flex items-center justify-between font-semibold">
                      <span>Total Monthly Expenses</span>
                      <span>$5,500</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-4">Budget Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Startup Costs</span>
                      <span className="font-semibold">$13,700</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Monthly Operating Costs</span>
                      <span className="font-semibold">$5,500</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Break-even Point</span>
                      <span className="font-semibold">5 months</span>
                    </div>
                    <div className="pt-3 border-t mt-3">
                      <p className="text-sm text-muted-foreground">
                        Based on your projected monthly revenue of $7,500, your business should become profitable after
                        5 months of operation, with a monthly profit of $2,000.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Budget
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Budget
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funding Options</CardTitle>
              <CardDescription>Explore different ways to fund your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold text-lg">Small Business Loans</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Traditional loans from banks or credit unions for established businesses with good credit history.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Interest Rates</span>
                        <span>5-10%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Amount Range</span>
                        <span>$5,000 - $500,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Term Length</span>
                        <span>1-5 years</span>
                      </div>
                    </div>
                    <div className="pt-3">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold text-lg">Microloans</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Small loans offered by nonprofit organizations specifically for startups and smaller businesses.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Interest Rates</span>
                        <span>8-15%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Amount Range</span>
                        <span>$500 - $50,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Term Length</span>
                        <span>6 months - 3 years</span>
                      </div>
                    </div>
                    <div className="pt-3">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold text-lg">Crowdfunding</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Raise small amounts of money from a large number of people, typically via online platforms.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Platform Fees</span>
                        <span>3-8% of funds raised</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Average Success Rate</span>
                        <span>~35%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Campaign Length</span>
                        <span>30-60 days</span>
                      </div>
                    </div>
                    <div className="pt-3">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-semibold text-lg">Angel Investors</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Individual investors who provide capital in exchange for ownership equity or convertible debt.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Typical Investment</span>
                        <span>$25,000 - $250,000</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Equity Exchange</span>
                        <span>10-30%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Investment Horizon</span>
                        <span>3-7 years</span>
                      </div>
                    </div>
                    <div className="pt-3">
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Legal & Compliance Guide</CardTitle>
              <CardDescription>Important legal information and resources for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Business Structure Options</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-base">Sole Proprietorship</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Simplest business structure with no separation between the business and owner. Owner has
                        complete control but also unlimited personal liability.
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Advantages:</span>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            <li>Simple and inexpensive to form</li>
                            <li>Complete control for the owner</li>
                            <li>Pass-through taxation</li>
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium">Disadvantages:</span>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            <li>Unlimited personal liability</li>
                            <li>Difficult to raise capital</li>
                            <li>Limited lifespan</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-base">Limited Liability Company (LLC)</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hybrid structure that provides the liability protection of a corporation with the tax benefits
                        of a partnership or sole proprietorship.
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Advantages:</span>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            <li>Limited personal liability</li>
                            <li>Pass-through taxation</li>
                            <li>Flexible management structure</li>
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium">Disadvantages:</span>
                          <ul className="list-disc pl-5 text-muted-foreground">
                            <li>More complex to form than sole proprietorship</li>
                            <li>Annual fees in some states</li>
                            <li>Self-employment taxes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline">View All Business Structures</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Registration Checklist</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <input type="checkbox" id="business-name" className="mt-1 mr-2" />
                      <div>
                        <Label htmlFor="business-name" className="font-medium">
                          Register Business Name
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Check if your business name is available and register it with your local government.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="tax-id" className="mt-1 mr-2" />
                      <div>
                        <Label htmlFor="tax-id" className="font-medium">
                          Obtain Tax ID Number
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get your Employer Identification Number (EIN) from the tax authority.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="licenses" className="mt-1 mr-2" />
                      <div>
                        <Label htmlFor="licenses" className="font-medium">
                          Apply for Business Licenses
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Obtain necessary licenses and permits for your business type and location.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="bank-account" className="mt-1 mr-2" />
                      <div>
                        <Label htmlFor="bank-account" className="font-medium">
                          Open Business Bank Account
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Separate personal and business finances by opening a dedicated business account.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="insurance" className="mt-1 mr-2" />
                      <div>
                        <Label htmlFor="insurance" className="font-medium">
                          Get Business Insurance
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Obtain appropriate insurance coverage for your business activities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">Legal Document Templates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-medium">Privacy Policy</h4>
                        <p className="text-sm text-muted-foreground">For websites and mobile apps</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-medium">Terms of Service</h4>
                        <p className="text-sm text-muted-foreground">User agreement for your website</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-medium">Customer Contract</h4>
                        <p className="text-sm text-muted-foreground">Basic service agreement</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Partnership Agreement</h4>
                        <p className="text-sm text-muted-foreground">For business partners</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Note: These templates are provided as starting points. We recommend consulting with a legal
                    professional to ensure documents meet your specific needs and comply with local laws.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

