"use client"

import { useState } from "react"
import { StudentDashboard } from "@/components/student-dashboard"
import { TeamFormation } from "@/components/team-formation"
import { BrowseProjects } from "@/components/browse-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Search, FileText, Settings, HelpCircle, GraduationCap } from "lucide-react"

type Page = "dashboard" | "team-formation" | "browse-projects"

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "team-formation", name: "Team Formation", icon: Users },
  { id: "browse-projects", name: "Browse Projects", icon: Search },
  { id: "submissions", name: "Submissions", icon: FileText },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "help", name: "Help & Support", icon: HelpCircle },
]

function AppSidebar({ currentPage, onPageChange }: { currentPage: Page; onPageChange: (page: Page) => void }) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">SyncSpace</h2>
            <p className="text-sm text-muted-foreground">Student Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Alex Smith</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Team Lead
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={currentPage === item.id}
                onClick={() => onPageChange(item.id as Page)}
                className="w-full justify-start"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default function SyncSpaceApp() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <StudentDashboard onNavigate={(page: string) => setCurrentPage(page as Page)} />
      case "team-formation":
        return <TeamFormation onNavigate={(page: string) => setCurrentPage(page as Page)} />
      case "browse-projects":
        return <BrowseProjects onNavigate={(page: string) => setCurrentPage(page as Page)} />
      default:
        return <StudentDashboard onNavigate={(page: string) => setCurrentPage(page as Page)} />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-4 lg:px-6">
              <SidebarTrigger className="lg:hidden" />
              <div className="ml-auto">
                <Button variant="ghost" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1">{renderPage()}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
