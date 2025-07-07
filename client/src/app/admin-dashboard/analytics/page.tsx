"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown, Users, Award, Clock } from "lucide-react"

const monthlyData = [
  { month: "Jan", projects: 12, teams: 45, applications: 120 },
  { month: "Feb", projects: 15, teams: 52, applications: 145 },
  { month: "Mar", projects: 18, teams: 61, applications: 168 },
  { month: "Apr", projects: 22, teams: 78, applications: 195 },
  { month: "May", projects: 25, teams: 89, applications: 220 },
  { month: "Jun", projects: 28, teams: 95, applications: 245 },
]

const categoryData = [
  { name: "Web Development", value: 35, color: "hsl(var(--chart-1))" },
  { name: "AI/ML", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Mobile Development", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Data Science", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 5, color: "hsl(var(--chart-5))" },
]

const performanceData = [
  { semester: "Fall 2023", completion: 78, satisfaction: 85, quality: 82 },
  { semester: "Spring 2024", completion: 82, satisfaction: 88, quality: 85 },
  { semester: "Fall 2024", completion: 85, satisfaction: 90, quality: 88 },
]

const departmentData = [
  { department: "Computer Science", projects: 45, teams: 180, avgRating: 4.6 },
  { department: "Data Science", projects: 32, teams: 128, avgRating: 4.4 },
  { department: "Software Engineering", projects: 28, teams: 112, avgRating: 4.8 },
  { department: "Mathematics", projects: 15, teams: 60, avgRating: 4.2 },
  { department: "Information Systems", projects: 12, teams: 48, avgRating: 4.5 },
]

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive insights into project performance and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Success Rate</p>
                <p className="text-2xl font-bold">85%</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+5% from last semester</span>
                </div>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Award className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Team Size</p>
                <p className="text-2xl font-bold">4.2</p>
                <div className="flex items-center text-sm text-blue-600 mt-1">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>Optimal range</span>
                </div>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student Satisfaction</p>
                <p className="text-2xl font-bold">4.6/5</p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+0.3 from last year</span>
                </div>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Project Duration</p>
                <p className="text-2xl font-bold">10.5 weeks</p>
                <div className="flex items-center text-sm text-red-600 mt-1">
                  <TrendingDown className="mr-1 h-4 w-4" />
                  <span>-1.2 weeks optimized</span>
                </div>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="professors">Professors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Project and team formation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    projects: { label: "Projects", color: "hsl(var(--chart-1))" },
                    teams: { label: "Teams", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="projects"
                        stackId="1"
                        stroke="var(--color-projects)"
                        fill="var(--color-projects)"
                      />
                      <Area
                        type="monotone"
                        dataKey="teams"
                        stackId="1"
                        stroke="var(--color-teams)"
                        fill="var(--color-teams)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Project Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Project Categories</CardTitle>
                <CardDescription>Distribution of projects by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    web: { label: "Web Development", color: "hsl(var(--chart-1))" },
                    ai: { label: "AI/ML", color: "hsl(var(--chart-2))" },
                    mobile: { label: "Mobile", color: "hsl(var(--chart-3))" },
                    data: { label: "Data Science", color: "hsl(var(--chart-4))" },
                    other: { label: "Other", color: "hsl(var(--chart-5))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Semester-wise performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completion: { label: "Completion Rate", color: "hsl(var(--chart-1))" },
                  satisfaction: { label: "Satisfaction", color: "hsl(var(--chart-2))" },
                  quality: { label: "Quality Score", color: "hsl(var(--chart-3))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="completion" stroke="var(--color-completion)" strokeWidth={2} />
                    <Line type="monotone" dataKey="satisfaction" stroke="var(--color-satisfaction)" strokeWidth={2} />
                    <Line type="monotone" dataKey="quality" stroke="var(--color-quality)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>Current status of all projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Projects</span>
                  <Badge className="bg-green-100 text-green-800">42</Badge>
                </div>
                <Progress value={70} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completed Projects</span>
                  <Badge className="bg-blue-100 text-blue-800">28</Badge>
                </div>
                <Progress value={47} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Draft Projects</span>
                  <Badge className="bg-gray-100 text-gray-800">15</Badge>
                </div>
                <Progress value={25} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Projects and ratings by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{dept.department}</p>
                        <p className="text-sm text-muted-foreground">
                          {dept.projects} projects • {dept.teams} teams
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{dept.avgRating}</span>
                          <span className="text-yellow-400 ml-1">★</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Formation Rate</CardTitle>
                <CardDescription>Teams formed vs applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">78%</div>
                  <p className="text-sm text-muted-foreground mt-1">Success rate</p>
                  <Progress value={78} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Team Size</CardTitle>
                <CardDescription>Distribution of team sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">2-3 members</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">4-5 members</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm">6+ members</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Overall team metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.6/5</div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-sm text-muted-foreground">Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="professors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professor Workload Distribution</CardTitle>
                <CardDescription>Current workload status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Optimal Workload</span>
                  <Badge className="bg-green-100 text-green-800">18 professors</Badge>
                </div>
                <Progress value={64} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Overloaded</span>
                  <Badge className="bg-red-100 text-red-800">6 professors</Badge>
                </div>
                <Progress value={21} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Available</span>
                  <Badge className="bg-blue-100 text-blue-800">4 professors</Badge>
                </div>
                <Progress value={14} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Professors</CardTitle>
                <CardDescription>Based on student ratings and project success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Emily Rodriguez", rating: 4.9, projects: 10 },
                    { name: "Dr. Sarah Johnson", rating: 4.8, projects: 12 },
                    { name: "Dr. Lisa Patel", rating: 4.7, projects: 7 },
                    { name: "Dr. Michael Chen", rating: 4.6, projects: 8 },
                  ].map((prof, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{prof.name}</p>
                        <p className="text-sm text-muted-foreground">{prof.projects} active projects</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{prof.rating}</span>
                        <span className="text-yellow-400 ml-1">★</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
