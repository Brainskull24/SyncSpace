"use client"
import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  Users,
  Target,
  Briefcase,
  UserPlus,
  AlertCircle,
  Download,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calendar,
  Settings,
} from "lucide-react"
import api from "@/lib/axios"
import { useRouter } from "next/navigation"

type SortOrder = "asc" | "desc" | null

interface Team {
  _id: string
  name: string
  description: string
  leader: string
  leaderEmail?: string
  members: number
  maxMembers: number
  projects: number
  applications: number
  status: "active" | "recruiting" | "disbanded" | "on-hold"
  skills: string[]
  createdDate: string
  leaderId?: string
  memberIds?: string[]
  projectIds?: string[]
  notes?: string
}

const getStatusBadge = (status: string) => {
  const statusMap = {
    active: "bg-green-100 text-green-800",
    recruiting: "bg-blue-100 text-blue-800",
    disbanded: "bg-gray-100 text-gray-800",
    "on-hold": "bg-yellow-100 text-yellow-800",
  }

  const statusLabels = {
    active: "Active",
    recruiting: "Recruiting",
    disbanded: "Disbanded",
    "on-hold": "On Hold",
  }

  return (
    <Badge className={statusMap[status as keyof typeof statusMap] || "bg-muted"}>
      {statusLabels[status as keyof typeof statusLabels] || status}
    </Badge>
  )
}

const getMembershipColor = (current: number, max: number) => {
  const percentage = (current / max) * 100
  if (percentage >= 90) return "text-green-600"
  if (percentage >= 70) return "text-orange-600"
  return "text-red-600"
}

const downloadCSV = (data: Team[], filename: string) => {
  if (data.length === 0) return

  const headers = [
    "Team Name",
    "Description",
    "Leader",
    "Leader Email",
    "Members",
    "Max Members",
    "Status",
    "Projects",
    "Applications",
    "Skills",
    "Created Date",
    "Notes",
  ]

  const csvRows = [
    headers.join(","),
    ...data.map((team) =>
      [
        `"${team.name}"`,
        `"${team.description}"`,
        `"${team.leader}"`,
        `"${team.leaderEmail || ""}"`,
        `"${team.members}"`,
        `"${team.maxMembers}"`,
        `"${team.status}"`,
        `"${team.projects}"`,
        `"${team.applications}"`,
        `"${team.skills.join("; ")}"`,
        `"${new Date(team.createdDate).toLocaleDateString()}"`,
        `"${team.notes || ""}"`,
      ].join(","),
    ),
  ]

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const perPage = 10

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortOrder === "asc") {
        setSortOrder("desc")
      } else if (sortOrder === "desc") {
        setSortOrder(null)
        setSortField(null)
      } else {
        setSortOrder("asc")
      }
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="inline-block w-4 h-4 ml-1" />
    }
    if (sortOrder === "asc") {
      return <ChevronUp className="inline-block w-4 h-4 ml-1" />
    }
    if (sortOrder === "desc") {
      return <ChevronDown className="inline-block w-4 h-4 ml-1" />
    }
    return <ChevronsUpDown className="inline-block w-4 h-4 ml-1" />
  }

  useEffect(() => {
    getAllTeams()
    const intervalId = setInterval(getAllTeams, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const getAllTeams = async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/auth/teams")
      setTeams(data.teams || [])
      setError(null)
    } catch (err) {
      console.error("Failed to fetch teams:", err)
      setError("Failed to load teams data.")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (teamId: string, newStatus: string) => {
    try {
      await api.patch(`/auth/teams/${teamId}`, { status: newStatus })
      setTeams((prev) =>
        prev.map((team) => (team._id === teamId ? { ...team, status: newStatus as Team["status"] } : team)),
      )
    } catch (err) {
      console.error("Failed to update team status:", err)
      setError("Failed to update team status.")
    }
  }

  const filteredTeams = useMemo(() => {
    let data = [...teams]

    // Tab filter
    if (activeTab !== "all") {
      data = data.filter((team) => team.status === activeTab)
    }

    // Search filter
    if (searchTerm.trim()) {
      data = data.filter((team) => {
        const searchFields = [
          team.name,
          team.description,
          team.leader,
          team.leaderEmail,
          team.notes,
          ...team.skills,
        ].filter(Boolean)

        return searchFields.some((field) => String(field).toLowerCase().includes(searchTerm.toLowerCase()))
      })
    }

    // Sorting
    if (sortField && sortOrder && data.length > 0) {
      data.sort((a, b) => {
        const aVal = a[sortField as keyof Team]
        const bVal = b[sortField as keyof Team]

        if (aVal == null && bVal == null) return 0
        if (aVal == null) return sortOrder === "asc" ? -1 : 1
        if (bVal == null) return sortOrder === "asc" ? 1 : -1

        let comparison = 0

        if (sortField === "createdDate") {
          comparison = new Date(aVal as string).getTime() - new Date(bVal as string).getTime()
        } else if (["members", "maxMembers", "projects", "applications"].includes(sortField)) {
          comparison = (aVal as number) - (bVal as number)
        } else if (typeof aVal === "string" && typeof bVal === "string") {
          comparison = aVal.localeCompare(bVal)
        } else {
          comparison = String(aVal).localeCompare(String(bVal))
        }

        return sortOrder === "asc" ? comparison : -comparison
      })
    }

    return data
  }, [teams, activeTab, searchTerm, sortField, sortOrder])

  const totalPages = Math.ceil(filteredTeams.length / perPage)
  const paginated = filteredTeams.slice((currentPage - 1) * perPage, currentPage * perPage)

  // Reset page if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  // Calculate stats
  const totalTeams = teams.length
  const activeTeams = teams.filter((t) => t.status === "active").length
  const recruitingTeams = teams.filter((t) => t.status === "recruiting").length
  const totalProjects = teams.reduce((sum, t) => sum + t.projects, 0)

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage student teams and their project assignments</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => downloadCSV(filteredTeams, "teams_export.csv")}
            disabled={filteredTeams.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                <p className="text-2xl font-bold">{totalTeams}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Teams</p>
                <p className="text-2xl font-bold">{activeTeams}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recruiting</p>
                <p className="text-2xl font-bold">{recruitingTeams}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{totalProjects}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teams, leaders, or skills..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Teams</CardTitle>
              <CardDescription>
                Manage team information and project assignments ({filteredTeams.length} total)
              </CardDescription>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value)
                setCurrentPage(1)
              }}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="recruiting">Recruiting</TabsTrigger>
                <TabsTrigger value="disbanded">Disbanded</TabsTrigger>
                <TabsTrigger value="on-hold">On Hold</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead onClick={() => handleSort("leader")} className="cursor-pointer hover:bg-muted/50">
                    Leader
                    {getSortIcon("leader")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("members")} className="cursor-pointer hover:bg-muted/50">
                    Members
                    {getSortIcon("members")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("status")} className="cursor-pointer hover:bg-muted/50">
                    Status
                    {getSortIcon("status")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("projects")} className="cursor-pointer hover:bg-muted/50">
                    Projects
                    {getSortIcon("projects")}
                  </TableHead>
                  <TableHead onClick={() => handleSort("applications")} className="cursor-pointer hover:bg-muted/50">
                    Applications
                    {getSortIcon("applications")}
                  </TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead onClick={() => handleSort("createdDate")} className="cursor-pointer hover:bg-muted/50">
                    Created Date
                    {getSortIcon("createdDate")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                        <span>Loading teams...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No teams found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((team) => (
                    <TableRow key={team._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {team.name.split(" ")[0]?.[0] || "T"}
                              {team.name.split(" ")[1]?.[0] || team.name.split(" ")[0]?.[1] || "M"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{team.name}</p>
                            <p className="text-sm text-muted-foreground">{team.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{team.leader}</p>
                          <p className="text-sm text-muted-foreground">{team.leaderEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${getMembershipColor(team.members, team.maxMembers)}`}>
                            {team.members}/{team.maxMembers}
                          </span>
                          <Users className="ml-1 h-3 w-3 text-muted-foreground" />
                          {team.members < team.maxMembers && team.status === "recruiting" && (
                            <AlertCircle className="ml-1 h-3 w-3 text-blue-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(team.status)}</TableCell>
                      <TableCell>{team.projects}</TableCell>
                      <TableCell>{team.applications}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {team.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {team.skills.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{team.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(team.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Team
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {team.status === "recruiting" && (
                              <>
                                <DropdownMenuItem
                                  className="text-green-600"
                                  onClick={() => handleStatusUpdate(team._id, "active")}
                                >
                                  <Target className="mr-2 h-4 w-4" />
                                  Mark Active
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-yellow-600"
                                  onClick={() => handleStatusUpdate(team._id, "on-hold")}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Put On Hold
                                </DropdownMenuItem>
                              </>
                            )}
                            {team.status === "active" && (
                              <DropdownMenuItem
                                className="text-blue-600"
                                onClick={() => handleStatusUpdate(team._id, "recruiting")}
                              >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Start Recruiting
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact Leader
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Members
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Team Settings
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredTeams.length > perPage && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="ghost"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
