"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Check,
  X,
  Clock,
  FileText,
  Users,
  Target,
  AlertCircle,
  Download,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  MessageSquare,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
} from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

type SortOrder = 'asc' | 'desc' | null;

interface Application {
  _id: string;
  teamName: string;
  teamLeader: string;
  teamLeaderEmail?: string;
  projectName: string;
  projectSupervisor: string;
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  priority: 'high' | 'medium' | 'low';
  matchScore: number;
  requirements?: string[];
  teamSkills?: string[];
  notes?: string;
  teamId?: string;
  projectId?: string;
  supervisorId?: string;
}

const getStatusBadge = (status: string) => {
  const statusMap = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    "under-review": "bg-blue-100 text-blue-800",
  };
  
  const statusLabels = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    "under-review": "Under Review",
  };

  return (
    <Badge className={statusMap[status as keyof typeof statusMap] || "bg-muted"}>
      {statusLabels[status as keyof typeof statusLabels] || status}
    </Badge>
  );
};

const getPriorityBadge = (priority: string) => {
  const priorityMap = {
    high: "bg-red-100 text-red-800",
    medium: "bg-orange-100 text-orange-800",
    low: "bg-gray-100 text-gray-800",
  };

  const priorityLabels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  return (
    <Badge className={priorityMap[priority as keyof typeof priorityMap] || "bg-muted"}>
      {priorityLabels[priority as keyof typeof priorityLabels] || priority}
    </Badge>
  );
};

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-orange-600";
  return "text-red-600";
};

const downloadCSV = (data: Application[], filename: string) => {
  if (data.length === 0) return;

  const headers = [
    "Team Name",
    "Team Leader",
    "Project Name",
    "Supervisor",
    "Status",
    "Priority",
    "Match Score",
    "Application Date",
    "Notes"
  ];

  const csvRows = [
    headers.join(","),
    ...data.map((app) => [
      `"${app.teamName}"`,
      `"${app.teamLeader}"`,
      `"${app.projectName}"`,
      `"${app.projectSupervisor}"`,
      `"${app.status}"`,
      `"${app.priority}"`,
      `"${app.matchScore}%"`,
      `"${new Date(app.applicationDate).toLocaleDateString()}"`,
      `"${app.notes || ''}"`
    ].join(","))
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const perPage = 10;

  const handleSort = (field: string) => {
    if (sortField === field) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortOrder(null);
        setSortField(null);
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="inline-block w-4 h-4 ml-1" />;
    }
    if (sortOrder === 'asc') {
      return <ChevronUp className="inline-block w-4 h-4 ml-1" />;
    }
    if (sortOrder === 'desc') {
      return <ChevronDown className="inline-block w-4 h-4 ml-1" />;
    }
    return <ChevronsUpDown className="inline-block w-4 h-4 ml-1" />;
  };

  useEffect(() => {
    getAllApplications();
    const intervalId = setInterval(getAllApplications, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllApplications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/auth/applications");
      setApplications(data.applications || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError("Failed to load applications data.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      await api.patch(`/auth/applications/${applicationId}`, { status: newStatus });
      setApplications(prev => 
        prev.map(app => 
          app._id === applicationId 
            ? { ...app, status: newStatus as Application['status'] }
            : app
        )
      );
    } catch (err) {
      console.error("Failed to update application status:", err);
      setError("Failed to update application status.");
    }
  };

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    // Tab filter
    if (activeTab !== "all") {
      data = data.filter((app) => app.status === activeTab);
    }

    // Search filter
    if (searchTerm.trim()) {
      data = data.filter((app) => {
        const searchFields = [
          app.teamName,
          app.teamLeader,
          app.projectName,
          app.projectSupervisor,
          app.teamLeaderEmail,
          app.notes
        ].filter(Boolean);
        
        return searchFields.some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Sorting
    if (sortField && sortOrder && data.length > 0) {
      data.sort((a, b) => {
        const aVal = a[sortField as keyof Application];
        const bVal = b[sortField as keyof Application];
        
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return sortOrder === 'asc' ? -1 : 1;
        if (bVal == null) return sortOrder === 'asc' ? 1 : -1;
        
        let comparison = 0;
        
        if (sortField === 'applicationDate') {
          comparison = new Date(aVal as string).getTime() - new Date(bVal as string).getTime();
        } else if (sortField === 'matchScore') {
          comparison = (aVal as number) - (bVal as number);
        } else if (typeof aVal === "string" && typeof bVal === "string") {
          comparison = aVal.localeCompare(bVal);
        } else {
          comparison = String(aVal).localeCompare(String(bVal));
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return data;
  }, [applications, activeTab, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredApplications.length / perPage);
  const paginated = filteredApplications.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Reset page if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // Calculate stats
  const totalApplications = applications.length;
  const pendingReview = applications.filter(a => a.status === "pending" || a.status === "under-review").length;
  const approved = applications.filter(a => a.status === "approved").length;
  const averageMatch = applications.length > 0 
    ? Math.round(applications.reduce((sum, a) => sum + a.matchScore, 0) / applications.length)
    : 0;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">
            Manage team applications to projects
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              downloadCSV(filteredApplications, "applications_export.csv")
            }
            disabled={filteredApplications.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Applications
                </p>
                <p className="text-2xl font-bold">{totalApplications}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Review
                </p>
                <p className="text-2xl font-bold">{pendingReview}</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Approved
                </p>
                <p className="text-2xl font-bold">{approved}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Match
                </p>
                <p className="text-2xl font-bold">{averageMatch}%</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Target className="h-5 w-5 text-blue-600" />
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
                placeholder="Search teams, projects, or supervisors..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
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

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>
                Review and manage team applications to projects ({filteredApplications.length} total)
              </CardDescription>
            </div>
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => {
                setActiveTab(value);
                setCurrentPage(1);
              }}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="under-review">Under Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
                  <TableHead
                    onClick={() => handleSort("projectName")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Project
                    {getSortIcon("projectName")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("projectSupervisor")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Supervisor
                    {getSortIcon("projectSupervisor")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("status")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Status
                    {getSortIcon("status")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("priority")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Priority
                    {getSortIcon("priority")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("matchScore")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Match Score
                    {getSortIcon("matchScore")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("applicationDate")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Applied Date
                    {getSortIcon("applicationDate")}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                        <span>Loading applications...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No applications found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {application.teamName.split(" ")[0]?.[0] || "T"}
                              {application.teamName.split(" ")[1]?.[0] || 
                               application.teamName.split(" ")[0]?.[1] || "M"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{application.teamName}</p>
                            <p className="text-sm text-muted-foreground">
                              Led by {application.teamLeader}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.projectName}</p>
                          {application.requirements && (
                            <p className="text-sm text-muted-foreground">
                              {application.requirements.slice(0, 2).join(", ")}
                              {application.requirements.length > 2 && "..."}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{application.projectSupervisor}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{getPriorityBadge(application.priority)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${getMatchScoreColor(application.matchScore)}`}>
                            {application.matchScore}%
                          </span>
                          {application.matchScore < 75 && (
                            <AlertCircle className="ml-1 h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(application.applicationDate).toLocaleDateString()}
                      </TableCell>
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
                            <DropdownMenuSeparator />
                            {application.status === "pending" && (
                              <>
                                <DropdownMenuItem 
                                  className="text-green-600"
                                  onClick={() => handleStatusUpdate(application._id, "approved")}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleStatusUpdate(application._id, "rejected")}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Contact Team
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
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
          {filteredApplications.length > perPage && (
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
  );
}