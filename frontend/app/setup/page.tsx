"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

export default function BusinessSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      setLoading(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="min-h-screen bg-muted/40 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Set Up Your Business Profile</h1>
          <p className="text-muted-foreground">
            Let's gather some information to help you create a tailored business plan.
          </p>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  {i < step ? <CheckCircle2 className="h-5 w-5" /> : i}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">
                  {i === 1 && "Basic Info"}
                  {i === 2 && "Products"}
                  {i === 3 && "Resources"}
                  {i === 4 && "Goals"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Card className="mb-8">
          {/* Step 1: Basic Business Info */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Basic Business Information</CardTitle>
                <CardDescription>
                  Tell us about your business idea and target market
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" placeholder="Enter your business name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="retail">
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-market">Target Market</Label>
                  <Textarea 
                    id="target-market" 
                    placeholder="Describe your ideal customers (age, income, location, needs, etc.)"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Business Stage</Label>
                  <RadioGroup defaultValue="idea">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="idea" id="idea" />
                      <Label htmlFor="idea">Just an idea</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="planning" id="planning" />
                      <Label htmlFor="planning">Planning stage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="started" id="started" />
                      <Label htmlFor="started">Already started</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="established" id="established" />
                      <Label htmlFor="established">Established business</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </>
          )}
          
          {/* Step 2: Product/Service Details */}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Product or Service Details</CardTitle>
                <CardDescription>
                  Tell us about what you're offering to customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Type of Offering</Label>
                  <RadioGroup defaultValue="product">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="product" id="product" />
                      <Label htmlFor="product">Physical Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="digital" id="digital" />
                      <Label htmlFor="digital">Digital Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="service" id="service" />
                      <Label htmlFor="service">Service</Label>
                    </div>
                  />
                    <Label htmlFor="service">Service</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid">Hybrid/Multiple</Label>
                  </div>
                </RadioGroup>
              </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea 
                    id="product-description" 
                    placeholder="Describe your product or service in detail"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pricing">Pricing Strategy</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Economy/Low-cost</SelectItem>
                      <SelectItem value="standard">Standard/Mid-range</SelectItem>
                      <SelectItem value="premium">Premium/High-end</SelectItem>
                      <SelectItem value="freemium">Freemium</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="undecided">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="competitors">Main Competitors</Label>
                  <Textarea 
                    id="competitors" 
                    placeholder="List your main competitors and what makes you different"
                    rows={3}
                  />
                </div>
              </CardContent>
            </>
          )}
          
          {/* Step 3: Resources & Team */}
          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Resources & Team</CardTitle>
                <CardDescription>
                  Tell us about your available resources and team members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Initial Funding</Label>
                  <RadioGroup defaultValue="bootstrap">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bootstrap" id="bootstrap" />
                      <Label htmlFor="bootstrap">Self-funded/Bootstrapped</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="family" id="family" />
                      <Label htmlFor="family">Family & Friends</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="loan" id="loan" />
                      <Label htmlFor="loan">Bank Loan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="investors" id="investors" />
                      <Label htmlFor="investors">Angel/VC Investors</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No funding yet</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Approximate Budget</Label>
                  <Select defaultValue="small">
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="micro">Under $1,000</SelectItem>
                      <SelectItem value="small">$1,000 - $10,000</SelectItem>
                      <SelectItem value="medium">$10,000 - $50,000</SelectItem>
                      <SelectItem value="large">$50,000 - $100,000</SelectItem>
                      <SelectItem value="xlarge">Over $100,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="team-size">Team Size</Label>
                  <Select defaultValue="solo">
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Just me (solo founder)</SelectItem>
                      <SelectItem value="small">2-5 people</SelectItem>
                      <SelectItem value="medium">6-10 people</SelectItem>
                      <SelectItem value="large">More than 10 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Team Skills & Expertise</Label>
                  <Textarea 
                    id="skills" 
                    placeholder="List the key skills and expertise available in your team"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="missing-skills">Missing Skills</Label>
                  <Textarea 
                    id="missing-skills" 
                    placeholder="What skills or expertise are you missing that you might need?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </>
          )}
          
          {/* Step 4: Goals & Challenges */}
          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle>Business Goals & Challenges</CardTitle>
                <CardDescription>
                  Tell us about your vision and the obstacles you're facing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="short-goals">Short-term Goals (0-6 months)</Label>
                  <Textarea 
                    id="short-goals" 
                    placeholder="What do you want to achieve in the next 6 months?"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="long-goals">Long-term Goals (1-5 years)</Label>
                  <Textarea 
                    id="long-goals" 
                    placeholder="What's your vision for the business in the next few years?"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="challenges">Key Challenges</Label>
                  <Textarea 
                    id="challenges" 
                    placeholder="What are the biggest obstacles or challenges you're facing?"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Priority Areas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="funding" className="rounded" />
                      <Label htmlFor="funding" className="text-sm">Securing Funding</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="marketing" className="rounded" />
                      <Label htmlFor="marketing" className="text-sm">Marketing & Sales</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="operations" className="rounded" />
                      <Label htmlFor="operations" className="text-sm">Operations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="product" className="rounded" />
                      <Label htmlFor="product" className="text-sm">Product Development</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="legal" className="rounded" />
                      <Label htmlFor="legal" className="text-sm">Legal & Compliance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="team" className="rounded" />
                      <Label htmlFor="team" className="text-sm">Team Building</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="help-needed">How Can We Help?</Label>
                  <Textarea 
                    id="help-needed" 
                    placeholder="What specific guidance or support do you need most right now?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </>
          )}
          
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <Button onClick={handleNext}>
              {step < 4 ? (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating your plan...
                </>
              ) : (
                <>
                  Finish Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
          <p className="flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your information helps our AI create a personalized business plan. We keep all your data secure and private.
          </p>
        </div>
      </div>
  </div>
  )
}

