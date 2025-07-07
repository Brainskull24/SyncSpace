import { Bell, FileText, MessageSquare, Users, GitPullRequest } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "submission",
      icon: FileText,
      title: "New submission from Code Crusaders",
      description: "Phase 2 development milestone submitted",
      time: "2 minutes ago",
      priority: "high",
    },
    {
      id: 2,
      type: "application",
      icon: Users,
      title: "Team application received",
      description: "New team applied for AI Chatbot System project",
      time: "15 minutes ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "message",
      icon: MessageSquare,
      title: "Question from Tech Titans",
      description: "Regarding testing framework requirements",
      time: "1 hour ago",
      priority: "medium",
    },
    {
      id: 4,
      type: "review",
      icon: GitPullRequest,
      title: "Code review completed",
      description: "Data Dynamos - Phase 1 approved",
      time: "2 hours ago",
      priority: "low",
    },
    {
      id: 5,
      type: "notification",
      icon: Bell,
      title: "Deadline reminder",
      description: "Mobile Health App testing phase due tomorrow",
      time: "3 hours ago",
      priority: "high",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest submissions and updates</CardDescription>
          </div>
          <Badge variant="secondary">5 new</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="p-2 rounded-full bg-blue-100">
                <activity.icon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{activity.title}</h4>
                  <Badge className={getPriorityColor(activity.priority)} variant="secondary">
                    {activity.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
