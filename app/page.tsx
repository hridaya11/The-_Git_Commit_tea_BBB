import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { ArrowRight, BarChart2, Calendar, CheckCircle, Clock, Users } from "lucide-react"
import Link from "next/link"

const features = [
  {
    title: "Business Dashboard",
    description: "Track key metrics and performance with interactive charts and reports",
    icon: BarChart2,
  },
  {
    title: "Kanban Board",
    description: "Manage tasks with drag-and-drop functionality and workflow customization",
    icon: CheckCircle,
  },
  {
    title: "Staff Management",
    description: "Assign tasks and manage roles with intuitive interfaces",
    icon: Users,
  },
  {
    title: "Client Management",
    description: "Track client progress and manage communication efficiently",
    icon: Users,
  },
  {
    title: "Collaboration Tools",
    description: "Real-time updates, messaging, and notifications for team coordination",
    icon: Clock,
  },
  {
    title: "Calendar Integration",
    description: "Schedule meetings and track deadlines with integrated calendar",
    icon: Calendar,
  },
]

const words = [
  {
    text: "Streamline",
  },
  {
    text: "your",
  },
  {
    text: "business",
  },
  {
    text: "operations",
  },
  {
    text: "with",
  },
  {
    text: "our",
  },
  {
    text: "SaaS",
  },
  {
    text: "platform.",
    className: "text-primary",
  },
]

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-4">
        <BackgroundBeams className="absolute inset-0" />
        <div className="z-10 max-w-5xl mx-auto">
          <div className="mb-8">
            <TypewriterEffect words={words} className="text-4xl md:text-6xl font-bold" />
          </div>
          <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
            A modern, highly interactive, and visually captivating SaaS platform with smooth animations, engaging
            transitions, and an optimized user experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <TracingBeam>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Key Features</h2>
            <HoverEffect
              items={features.map((feature) => ({
                title: feature.title,
                description: feature.description,
                icon: <feature.icon className="h-8 w-8 text-primary" />,
              }))}
            />
          </div>
        </TracingBeam>
      </section>
    </div>
  )
}

