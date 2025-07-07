"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

const professorData = [
  { name: "Dr. Johnson", projects: 12 },
  { name: "Dr. Chen", projects: 8 },
  { name: "Dr. Rodriguez", projects: 10 },
  { name: "Dr. Wilson", projects: 5 },
  { name: "Dr. Patel", projects: 7 },
]

const professors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    projects: 12,
    status: "overloaded",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    department: "Data Science",
    projects: 8,
    status: "optimal",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    department: "Engineering",
    projects: 10,
    status: "optimal",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    department: "Mathematics",
    projects: 5,
    status: "underloaded",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "overloaded":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          Overloaded
        </Badge>
      )
    case "optimal":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Optimal
        </Badge>
      )
    case "underloaded":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Underloaded
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function ProfessorManagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Professor Workload</CardTitle>
          <CardDescription>Project assignments per professor</CardDescription>
        </div>
        <Users className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-6 overflow-auto h-[300px]">
          <ChartContainer
            config={{
              projects: { label: "Projects", color: "hsl(var(--chart-1))" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={professorData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="projects" fill="var(--color-projects)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-sm font-medium">Professor List</h3>
          <div className="space-y-4">
            {professors.map((professor) => (
              <div key={professor.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>
                      {professor.name.split(" ")[1][0]}
                      {professor.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{professor.name}</p>
                    <p className="text-xs text-muted-foreground">{professor.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{professor.projects} projects</p>
                    <div className="mt-1">{getStatusBadge(professor.status)}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Assign
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
