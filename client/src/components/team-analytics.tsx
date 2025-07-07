"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BarChart3 } from "lucide-react"

const teamStatusData = [
  { name: "Active", value: 65, color: "hsl(var(--chart-1))" },
  { name: "Completed", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Inactive", value: 10, color: "hsl(var(--chart-3))" },
]

const semesterData = [
  { name: "Fall 2024", current: 78, previous: 72 },
  { name: "Spring 2024", current: 82, previous: 68 },
  { name: "Fall 2023", current: 72, previous: 75 },
  { name: "Spring 2023", current: 68, previous: 65 },
]

const topTeams = [
  { id: 1, name: "Quantum Coders", score: 98, members: 5 },
  { id: 2, name: "Data Wizards", score: 95, members: 4 },
  { id: 3, name: "AI Innovators", score: 92, members: 6 },
]

export function TeamAnalytics() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Team Performance Metrics</CardTitle>
          <CardDescription>Team status and semester comparison</CardDescription>
        </div>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
          <div>
            <h3 className="mb-2 text-sm font-medium">Team Status Distribution</h3>
            <div className="h-[200px] flex justify-center">
              <ChartContainer
                config={{
                  active: { label: "Active", color: "hsl(var(--chart-1))" },
                  completed: { label: "Completed", color: "hsl(var(--chart-2))" },
                  inactive: { label: "Inactive", color: "hsl(var(--chart-3))" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {teamStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium">Semester Performance</h3>
            <div className="h-[300px] overflow-auto">
              <ChartContainer
                config={{
                  current: { label: "Current", color: "hsl(var(--chart-1))" },
                  previous: { label: "Previous", color: "hsl(var(--chart-2))" },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={semesterData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickFormatter={(value) => value.split(" ")[0]} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="current" fill="var(--color-current)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="previous" fill="var(--color-previous)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-sm font-medium">Top Performing Teams</h3>
          <div className="space-y-4">
            {topTeams.map((team) => (
              <div key={team.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-xs text-muted-foreground">{team.members} members</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">{team.score} points</Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
