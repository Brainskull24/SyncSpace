import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, Clock, FileText, MessageSquare, Users } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "application",
    title: "New team application",
    description: "Team Quantum Coders applied for AI Research Initiative",
    time: "5 minutes ago",
    icon: Users,
  },
  {
    id: 2,
    type: "submission",
    title: "Project submission",
    description: "Team Data Wizards submitted their final project",
    time: "1 hour ago",
    icon: FileText,
  },
  {
    id: 3,
    type: "feedback",
    title: "Professor feedback posted",
    description: "Dr. Johnson posted feedback for Team AI Innovators",
    time: "3 hours ago",
    icon: MessageSquare,
  },
  {
    id: 4,
    type: "alert",
    title: "System alert",
    description: "Database backup completed successfully",
    time: "5 hours ago",
    icon: Bell,
  },
]

const getActivityIcon = (type: string, Icon: any) => {
  switch (type) {
    case "application":
      return <Icon className="h-5 w-5 text-blue-600" />
    case "submission":
      return <Icon className="h-5 w-5 text-green-600" />
    case "feedback":
      return <Icon className="h-5 w-5 text-amber-600" />
    case "alert":
      return <Icon className="h-5 w-5 text-purple-600" />
    default:
      return <Icon className="h-5 w-5" />
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">System Activity</CardTitle>
        <CardDescription>Recent events and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="rounded-full bg-background p-2 shadow-sm">
                {getActivityIcon(activity.type, activity.icon)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{activity.title}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <div className="flex space-x-2 pt-1">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <CheckCircle className="mr-1 h-3 w-3" /> Mark as read
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
