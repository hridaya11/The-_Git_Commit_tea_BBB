"use client"

import { useState } from "react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles } from "@/components/ui/sparkles"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ChevronDown, ChevronUp, Users } from "lucide-react"

// Sample client data
const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acmecorp.com",
    avatar: "/placeholder.svg?height=100&width=100",
    progress: 75,
    projects: 3,
    assignedStaff: ["Jane Smith", "Alex Johnson"],
    status: "active",
  },
  {
    id: 2,
    name: "Globex Industries",
    contact: "Sarah Johnson",
    email: "sarah@globex.com",
    avatar: "/placeholder.svg?height=100&width=100",
    progress: 45,
    projects: 2,
    assignedStaff: ["Mike Brown", "Emily Davis"],
    status: "active",
  },
  {
    id: 3,
    name: "Initech LLC",
    contact: "Michael Bolton",
    email: "michael@initech.com",
    avatar: "/placeholder.svg?height=100&width=100",
    progress: 90,
    projects: 1,
    assignedStaff: ["John Doe"],
    status: "active",
  },
  {
    id: 4,
    name: "Umbrella Corp",
    contact: "Alice Wong",
    email: "alice@umbrella.com",
    avatar: "/placeholder.svg?height=100&width=100",
    progress: 30,
    projects: 4,
    assignedStaff: ["Sarah Williams", "Mike Brown"],
    status: "inactive",
  },
  {
    id: 5,
    name: "Stark Industries",
    contact: "Tony Stark",
    email: "tony@stark.com",
    avatar: "/placeholder.svg?height=100&width=100",
    progress: 60,
    projects: 2,
    assignedStaff: ["John Doe", "Jane Smith"],
    status: "active",
  },
]

export default function ClientsPage() {
  const [expandedClient, setExpandedClient] = useState(null)

  const toggleExpand = (clientId) => {
    if (expandedClient === clientId) {
      setExpandedClient(null)
    } else {
      setExpandedClient(clientId)
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          <Sparkles>Client Management</Sparkles>
        </h1>
        <Button>Add New Client</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            {clients.map((client) => (
              <AnimatedCard key={client.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{client.name}</CardTitle>
                        <CardDescription>{client.contact}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => toggleExpand(client.id)}>
                      {expandedClient === client.id ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Project Progress</span>
                      <span className="text-sm font-medium">{client.progress}%</span>
                    </div>
                    <Progress value={client.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Email: </span>
                      {client.email}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Projects: </span>
                      {client.projects}
                    </div>
                  </div>
                </CardContent>
                {expandedClient === client.id && (
                  <div className="px-6 pb-6 pt-2 bg-muted/50 animate-in slide-in-from-top duration-300">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2" /> Assigned Staff
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {client.assignedStaff.map((staff, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-background rounded-md px-3 py-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {staff
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{staff}</span>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="h-8">
                        Assign Staff
                      </Button>
                    </div>
                  </div>
                )}
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </CardFooter>
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

