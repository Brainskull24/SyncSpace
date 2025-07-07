import { BookOpen, Clock, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StatsCards() {
  const stats = [
    {
      title: "Assigned Projects",
      value: "8",
      subtitle: "5 active",
      icon: BookOpen,
      trend: "+2 this semester",
      color: "text-blue-600",
    },
    {
      title: "Teams Under Supervision",
      value: "24",
      subtitle: "96 total members",
      icon: Users,
      trend: "+6 new teams",
      color: "text-green-600",
    },
    {
      title: "Pending Reviews",
      value: "12",
      subtitle: "3 urgent",
      icon: Clock,
      trend: "2 due today",
      color: "text-orange-600",
    },
    {
      title: "Average Team Performance",
      value: "87%",
      subtitle: "↑ 5% from last month",
      icon: TrendingUp,
      trend: "Trending up",
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-600 mt-1">{stat.subtitle}</p>
            <Badge variant="secondary" className="mt-2 text-xs">
              {stat.trend}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
