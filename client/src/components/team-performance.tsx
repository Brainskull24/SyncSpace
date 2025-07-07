import { TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function TeamPerformance() {
  const teams = [
    {
      name: "Code Crusaders",
      project: "E-Commerce Platform",
      progress: 85,
      status: "on-track",
      phase: "Development",
      trend: "up",
    },
    {
      name: "Tech Titans",
      project: "Mobile Health App",
      progress: 92,
      status: "ahead",
      phase: "Testing",
      trend: "up",
    },
    {
      name: "AI Innovators",
      project: "AI Chatbot System",
      progress: 45,
      status: "delayed",
      phase: "Planning",
      trend: "down",
    },
    {
      name: "Data Dynamos",
      project: "Analytics Dashboard",
      progress: 78,
      status: "on-track",
      phase: "Development",
      trend: "up",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-500"
      case "ahead":
        return "bg-blue-500"
      case "delayed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Progress Tracking</CardTitle>
        <CardDescription>Real-time overview of all team performances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm">{team.name}</h4>
                  <p className="text-xs text-gray-600">{team.project}</p>
                </div>
                <div className="flex items-center gap-2">
                  {team.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <Badge variant="outline" className="text-xs">
                    {team.phase}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{team.progress}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(team.status)}`} />
                  <Progress value={team.progress} className="flex-1 h-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
