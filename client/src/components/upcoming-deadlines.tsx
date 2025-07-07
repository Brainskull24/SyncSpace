import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      title: "Mobile Health App - Testing Phase",
      project: "Mobile Health App",
      date: "Nov 8, 2024",
      time: "11:59 PM",
      daysLeft: 1,
      type: "Phase Deadline",
      priority: "urgent",
    },
    {
      id: 2,
      title: "Code Review - E-Commerce Platform",
      project: "E-Commerce Platform",
      date: "Nov 10, 2024",
      time: "5:00 PM",
      daysLeft: 3,
      type: "Review Due",
      priority: "high",
    },
    {
      id: 3,
      title: "Team Presentations",
      project: "AI Chatbot System",
      date: "Nov 15, 2024",
      time: "2:00 PM",
      daysLeft: 8,
      type: "Presentation",
      priority: "medium",
    },
    {
      id: 4,
      title: "Final Project Submission",
      project: "Analytics Dashboard",
      date: "Dec 1, 2024",
      time: "11:59 PM",
      daysLeft: 24,
      type: "Final Deadline",
      priority: "low",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <Clock className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important dates and milestones</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className={`border rounded-lg p-4 ${getPriorityColor(deadline.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(deadline.priority)}
                    <h4 className="font-semibold text-sm">{deadline.title}</h4>
                  </div>
                  <p className="text-sm opacity-80">{deadline.project}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>
                      {deadline.date} at {deadline.time}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {deadline.type}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{deadline.daysLeft}</div>
                  <div className="text-xs opacity-80">{deadline.daysLeft === 1 ? "day left" : "days left"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
