import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, LineChart, Lightbulb, Banknote, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">B</div>
          <span className="font-semibold text-xl">BES</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-primary">
            Login
          </Link>
          <Link href="/auth/signup">
            <Button size="sm" className="hidden sm:flex">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24 bg-gradient-to-b from-primary/5 to-background flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Your AI-powered Business Coach</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Helping entrepreneurs in emerging markets launch, grow, and succeed with personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Your Business Journey <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 px-4 md:px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Lightbulb className="h-12 w-12 text-primary" />}
              title="AI-generated Business Plans"
              description="Get customized business plans tailored to your industry, location, and resources."
            />
            <FeatureCard
              icon={<LineChart className="h-12 w-12 text-primary" />}
              title="Market Analysis"
              description="Access real-time market insights and competitor analysis for your niche."
            />
            <FeatureCard
              icon={<Banknote className="h-12 w-12 text-primary" />}
              title="Financial Guidance"
              description="Budget templates, revenue forecasting, and funding recommendations."
            />
            <FeatureCard
              icon={<Users className="h-12 w-12 text-primary" />}
              title="Mentor Community"
              description="Connect with experienced mentors and fellow entrepreneurs."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col space-y-8">
            <StepItem
              number="1"
              title="Create Your Profile"
              description="Answer a few questions about your business idea, goals, and resources."
            />
            <StepItem
              number="2"
              title="Get Your Custom Plan"
              description="Our AI generates a tailored business plan with actionable steps."
            />
            <StepItem
              number="3"
              title="Execute with Guidance"
              description="Follow the plan with AI coaching and community support at every step."
            />
            <StepItem
              number="4"
              title="Grow Your Business"
              description="Track progress, adapt your strategy, and scale with confidence."
            />
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Now <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary mt-auto py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="font-semibold text-xl">BES</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered business coaching for entrepreneurs in emerging markets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} Business Empowerment System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-background border rounded-xl p-6 flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StepItem({ number, title, description }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-6">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-lg">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

