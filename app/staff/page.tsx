"use client";

import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "@/components/ui/sparkles";
import { AnimatedCard } from "@/components/ui/animated-card";

// Sample staff data
const staffMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Project Manager",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Management",
    activeTasks: 8,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UI/UX Designer",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Design",
    activeTasks: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Frontend Developer",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Development",
    activeTasks: 12,
    status: "busy",
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Backend Developer",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Development",
    activeTasks: 7,
    status: "active",
  },
  {
    id: 5,
    name: "Mike Brown",
    role: "QA Engineer",
    email: "mike.brown@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Quality Assurance",
    activeTasks: 4,
    status: "away",
  },
  {
    id: 6,
    name: "Emily Davis",
    role: "Product Owner",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    department: "Management",
    activeTasks: 6,
    status: "active",
  },
];

export default function StaffPage() {
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Determine which color to show for the staff member’s status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "busy":
        return "bg-red-500";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Helper to render a grid of staff cards
  const renderStaffGrid = (filteredStaff: typeof staffMembers) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <AnimatedCard
            key={staff.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedStaff(staff)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback>
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{staff.name}</CardTitle>
                    <CardDescription>{staff.role}</CardDescription>
                  </div>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(staff.status)}`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-2">
                {staff.email}
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="outline">{staff.department}</Badge>
                <span className="text-sm font-medium">
                  {staff.activeTasks} active tasks
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            </CardFooter>
          </AnimatedCard>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          <Sparkles>Staff Management</Sparkles>
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Staff Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>
                Enter the details of the new staff member here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input id="role" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Quality Assurance">
                      Quality Assurance
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs for department-based filtering */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="qa">Quality Assurance</TabsTrigger>
        </TabsList>

        {/* All Staff */}
        <TabsContent value="all" className="mt-6">
          {renderStaffGrid(staffMembers)}
        </TabsContent>

        {/* Management */}
        <TabsContent value="management" className="mt-6">
          {renderStaffGrid(
            staffMembers.filter(
              (staff) => staff.department === "Management"
            )
          )}
        </TabsContent>

        {/* Design */}
        <TabsContent value="design" className="mt-6">
          {renderStaffGrid(
            staffMembers.filter(
              (staff) => staff.department === "Design"
            )
          )}
        </TabsContent>

        {/* Development */}
        <TabsContent value="development" className="mt-6">
          {renderStaffGrid(
            staffMembers.filter(
              (staff) => staff.department === "Development"
            )
          )}
        </TabsContent>

        {/* Quality Assurance */}
        <TabsContent value="qa" className="mt-6">
          {renderStaffGrid(
            staffMembers.filter(
              (staff) => staff.department === "Quality Assurance"
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
