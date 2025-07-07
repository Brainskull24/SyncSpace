"use client"

import { useState } from "react"
import { Bell, Search, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { StatsCards } from "@/components/stats-cards-professor"
import { ActiveProjects } from "@/components/active-projects"
import { ReviewQueue } from "@/components/review-queue"
import { TeamPerformance } from "@/components/team-performance"
import { RecentActivity } from "@/components/recent-activity-professor"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { CommunicationHub } from "@/components/communication-hub"
import { QuickActions } from "@/components/quick-actions-professor"

export default function ProfessorDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Prof. Johnson</h1>
            <p className="text-sm text-gray-600">Fall 2024 • Computer Science Department</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>PJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-6 py-6">
        <StatsCards />
      </div>

      {/* Main Content Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ActiveProjects />
            <TeamPerformance />
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <ReviewQueue />
            <RecentActivity />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <UpcomingDeadlines />
            <CommunicationHub />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}
