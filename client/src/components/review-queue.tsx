import { AlertCircle, Calendar, CheckCircle, Clock, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export function ReviewQueue() {
  const reviews = [
    {
      id: 1,
      teamName: "Code Crusaders",
      project: "E-Commerce Platform",
      phase: "Phase 2: Development",
      submissionType: "Code Review",
      daysAgo: 1,
      priority: "High",
      status: "pending",
    },
    {
      id: 2,
      teamName: "Tech Titans",
      project: "Mobile Health App",
      phase: "Phase 3: Testing",
      submissionType: "Test Results",
      daysAgo: 3,
      priority: "Medium",
      status: "pending",
    },
    {
      id: 3,
      teamName: "AI Innovators",
      project: "AI Chatbot System",
      phase: "Phase 1: Planning",
      submissionType: "Project Proposal",
      daysAgo: 0,
      priority: "High",
      status: "pending",
    },
    {
      id: 4,
      teamName: "Data Dynamos",
      project: "Analytics Dashboard",
      phase: "Phase 2: Development",
      submissionType: "Progress Report",
      daysAgo: 5,
      priority: "Low",
      status: "pending",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="h-4 w-4" />
      case "Medium":
        return <Clock className="h-4 w-4" />
      case "Low":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Submissions awaiting your review</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Batch Review
            </Button>
            <Button size="sm">Review All</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Checkbox className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{review.teamName}</h4>
                    <Badge className={getPriorityColor(review.priority)}>
                      {getPriorityIcon(review.priority)}
                      <span className="ml-1">{review.priority}</span>
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{review.project}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">{review.phase}</span>
                    <span>•</span>
                    <span>{review.submissionType}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{review.daysAgo === 0 ? "Today" : `${review.daysAgo} days ago`}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Quick Review
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
