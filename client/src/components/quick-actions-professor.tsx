"use client"

import { useState } from "react"
import { Calendar, Download, FileText, MessageSquare, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: MessageSquare, label: "Create Announcement", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: Calendar, label: "Schedule Meeting", color: "bg-green-500 hover:bg-green-600" },
    { icon: FileText, label: "Generate Report", color: "bg-purple-500 hover:bg-purple-600" },
    { icon: Users, label: "Bulk Feedback", color: "bg-orange-500 hover:bg-orange-600" },
    { icon: Download, label: "Export Grades", color: "bg-red-500 hover:bg-red-600" },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-2">
              {actions.map((action, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                  <action.icon className="h-4 w-4 mr-3" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button size="lg" className="rounded-full h-14 w-14 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <Plus className={`h-6 w-6 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </Button>
    </div>
  )
}
