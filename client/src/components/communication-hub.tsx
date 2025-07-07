import { Send, Users, Video } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function CommunicationHub() {
  const messages = [
    {
      id: 1,
      from: "Code Crusaders",
      subject: "Question about API integration",
      preview: "Hi Prof. Johnson, we're having trouble with the payment gateway...",
      time: "10 minutes ago",
      unread: true,
      priority: "high",
    },
    {
      id: 2,
      from: "Tech Titans",
      subject: "Testing framework clarification",
      preview: "Could you please clarify which testing framework we should use...",
      time: "2 hours ago",
      unread: true,
      priority: "medium",
    },
    {
      id: 3,
      from: "AI Innovators",
      subject: "Project scope discussion",
      preview: "We'd like to schedule a meeting to discuss the project scope...",
      time: "1 day ago",
      unread: false,
      priority: "low",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Communications</CardTitle>
            <CardDescription>Messages and announcements</CardDescription>
          </div>
          <Badge variant="destructive">2 unread</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${message.unread ? "bg-blue-50 border-blue-200" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm ${message.unread ? "font-semibold" : "font-medium"}`}>{message.from}</h4>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className={`text-sm ${message.unread ? "font-medium" : "text-gray-600"}`}>{message.subject}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{message.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <Button className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Announcement
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Office Hours
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
