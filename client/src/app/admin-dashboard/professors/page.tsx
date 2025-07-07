"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, MoreHorizontal, Eye, Edit, Mail, Phone, Users, BookOpen, Award } from "lucide-react"

const professors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@syncspace.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    specialization: "Artificial Intelligence",
    projects: 12,
    teams: 45,
    rating: 4.8,
    status: "active",
    workload: "overloaded",
    joinDate: "2019-08-15",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@syncspace.edu",
    phone: "+1 (555) 234-5678",
    department: "Data Science",
    specialization: "Machine Learning",
    projects: 8,
    teams: 32,
    rating: 4.6,
    status: "active",
    workload: "optimal",
    joinDate: "2020-01-10",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@syncspace.edu",
    phone: "+1 (555) 345-6789",
    department: "Software Engineering",
    specialization: "Web Development",
    projects: 10,
    teams: 38,
    rating: 4.9,
    status: "active",
    workload: "optimal",
    joinDate: "2018-09-01",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    email: "james.wilson@syncspace.edu",
    phone: "+1 (555) 456-7890",
    department: "Mathematics",
    specialization: "Algorithms",
    projects: 5,
    teams: 20,
    rating: 4.4,
    status: "active",
    workload: "underloaded",
    joinDate: "2021-03-15",
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    email: "lisa.patel@syncspace.edu",
    phone: "+1 (555) 567-8901",
    department: "Computer Science",
    specialization: "Cybersecurity",
    projects: 7,
    teams: 28,
    rating: 4.7,
    status: "on-leave",
    workload: "optimal",
    joinDate: "2020-06-20",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "on-leave":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          On Leave
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          Inactive
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getWorkloadBadge = (workload: string) => {
  switch (workload) {
    case "underloaded":
      return <Badge className="bg-blue-100 text-blue-800">Available</Badge>
    case "optimal":
      return <Badge className="bg-green-100 text-green-800">Optimal</Badge>
    case "overloaded":
      return <Badge className="bg-red-100 text-red-800">Overloaded</Badge>
    default:
      return <Badge variant="outline">{workload}</Badge>
  }
}

export default function ProfessorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredProfessors = professors.filter((professor) => {
    const matchesSearch =
      professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && professor.status === activeTab
  })

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Professors</h1>
          <p className="text-muted-foreground">Manage professor assignments and workloads</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Professor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Professors</p>
                <p className="text-2xl font-bold">{professors.length}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Professors</p>
                <p className="text-2xl font-bold">{professors.filter((p) => p.status === "active").length}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{professors.reduce((sum, p) => sum + p.projects, 0)}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">
                  {(professors.reduce((sum, p) => sum + p.rating, 0) / professors.length).toFixed(1)}
                </p>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search professors, departments, or specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Professors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Professors</CardTitle>
          <CardDescription>Manage professor information and assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="on-leave">On Leave</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Professor</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Workload</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessors.map((professor) => (
                  <TableRow key={professor.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {professor.name.split(" ")[0][0]}
                            {professor.name.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{professor.name}</p>
                          <p className="text-sm text-muted-foreground">{professor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{professor.department}</TableCell>
                    <TableCell>{professor.specialization}</TableCell>
                    <TableCell>{getStatusBadge(professor.status)}</TableCell>
                    <TableCell>{getWorkloadBadge(professor.workload)}</TableCell>
                    <TableCell>{professor.projects}</TableCell>
                    <TableCell>{professor.teams}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{professor.rating}</span>
                        <span className="text-yellow-400 ml-1">★</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call Professor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
