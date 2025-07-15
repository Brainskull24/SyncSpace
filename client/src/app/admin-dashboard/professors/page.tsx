"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  Phone,
  Users,
  BookOpen,
  Award,
  Download,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  User,
  Building,
  Calendar,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

const downloadCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((field) => `"${row[field] || ""}"`).join(",")
    ),
  ];
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

type SortOrder = "asc" | "desc" | null;

export default function ProfessorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [professors, setProfessors] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const perPage = 10;

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortOrder(null);
        setSortField(null);
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    getAllProfessors();
    const intervalId = setInterval(getAllProfessors, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllProfessors = async () => {
    try {
      const { data } = await api.get("/auth/professors");
      setProfessors(data.professors || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch professors:", err);
      setError("Failed to load professor data.");
    }
  };

  const filteredProfessors = useMemo(() => {
    let data = [...professors];

    // Tabs filter
    if (activeTab !== "all") {
      data = data.filter((p) => p.status === activeTab);
    }

    // Search filter
    if (searchTerm.trim()) {
      data = data.filter((p) => {
        const searchFields = [
          p.firstName,
          p.lastName,
          p.department,
          p.email,
          p.employeeId,
        ].filter(Boolean);
        return searchFields.some((field) =>
          String(field).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Sorting
    if (sortField && sortOrder && data.length > 0) {
      data.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        // Handle null/undefined values
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return sortOrder === "asc" ? -1 : 1;
        if (bVal == null) return sortOrder === "asc" ? 1 : -1;

        let comparison = 0;
        if (typeof aVal === "string" && typeof bVal === "string") {
          comparison = aVal.localeCompare(bVal);
        } else if (typeof aVal === "number" && typeof bVal === "number") {
          comparison = aVal - bVal;
        } else {
          // Convert to strings for comparison
          comparison = String(aVal).localeCompare(String(bVal));
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });
    }

    return data;
  }, [professors, activeTab, searchTerm, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredProfessors.length / perPage);
  const paginated = filteredProfessors.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Reset page if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="inline-block w-4 h-4 ml-1" />;
    }
    if (sortOrder === "asc") {
      return <ChevronUp className="inline-block w-4 h-4 ml-1" />;
    }
    if (sortOrder === "desc") {
      return <ChevronDown className="inline-block w-4 h-4 ml-1" />;
    }
    return <ChevronsUpDown className="inline-block w-4 h-4 ml-1" />;
  };

  const handleViewProfile = (professor: any) => {
    setSelectedProfessor(professor);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPhoneNumber = (countryCode: string, phoneNumber: string) => {
    if (!phoneNumber) return "N/A";
    return countryCode ? `${countryCode} ${phoneNumber}` : phoneNumber;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case "on-leave":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">On Leave</Badge>
        );
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    }
  };

  // Calculate stats
  const totalProfessors = professors.length;
  const activeProfessors = professors.filter(
    (p) => p.status === "active"
  ).length;
  const totalProjects = professors.reduce(
    (sum, p) => sum + (p.projects || 0),
    0
  );
  const uniqueDepartments = new Set(
    professors.map((p) => p.department).filter(Boolean)
  ).size;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Professors</h1>
          <p className="text-muted-foreground">
            Manage professor assignments and workloads
          </p>
        </div>
        <div className="flex gap-6">
          <Button
            variant="outline"
            onClick={() =>
              downloadCSV(filteredProfessors, "professors_export.csv")
            }
            disabled={filteredProfessors.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
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
                  Total Professors
                </p>
                <p className="text-2xl font-bold">{totalProfessors}</p>
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
                <p className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </p>
                <p className="text-2xl font-bold">{totalProjects}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Professors
                </p>
                <p className="text-2xl font-bold">{activeProfessors}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Departments
                </p>
                <p className="text-2xl font-bold">{uniqueDepartments}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search professors..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs + Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Professors</CardTitle>
              <CardDescription>
                View and manage professor records ({filteredProfessors.length}{" "}
                total)
              </CardDescription>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(v) => {
                setActiveTab(v);
                setCurrentPage(1);
              }}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="on-leave">On Leave</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Professor</TableHead>
                  <TableHead
                    onClick={() => handleSort("department")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Department{getSortIcon("department")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("employeeId")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Employee ID{getSortIcon("employeeId")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("projects")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Projects{getSortIcon("projects")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("teams")}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    Teams{getSortIcon("teams")}
                  </TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No professors found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((prof) => (
                    <TableRow key={prof._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={prof.profilePicture || "/"} />
                            <AvatarFallback>
                              {prof.firstName && prof.lastName
                                ? `${prof.firstName[0]}${prof.lastName[0]}`
                                : prof.firstName?.[0] ||
                                  prof.lastName?.[0] ||
                                  "P"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {prof.firstName} {prof.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {prof.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{prof.department || "N/A"}</TableCell>
                      <TableCell className="text-center">
                        {prof.employeeId || "N/A"}
                      </TableCell>
                      <TableCell>{prof.projects || 0}</TableCell>
                      <TableCell>{prof.teams || 0}</TableCell>
                      <TableCell>{prof.phoneNumber || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => handleViewProfile(prof)}
                            >
                              <Eye className="mr-2 h-4 w-4" /> View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" /> Call Professor
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
          {filteredProfessors.length > perPage && (
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

      {/* Professor Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    selectedProfessor?.profilePicture || `/?height=48&width=48`
                  }
                />
                <AvatarFallback>
                  {selectedProfessor?.firstName?.[0]}
                  {selectedProfessor?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedProfessor?.firstName} {selectedProfessor?.lastName}
                </h2>
                <p className="text-muted-foreground font-normal">Professor</p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Complete profile information and professional details
            </DialogDescription>
          </DialogHeader>

          {selectedProfessor && (
            <div className="grid gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </label>
                    <p className="font-medium">
                      {selectedProfessor.firstName} {selectedProfessor.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <p className="font-medium">{selectedProfessor.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <p className="font-medium">
                      {formatPhoneNumber(
                        selectedProfessor.countryCode,
                        selectedProfessor.phoneNumber
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      University ID
                    </label>
                    <p className="font-medium">
                      {selectedProfessor.universityId || "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Employee ID
                    </label>
                    <p className="font-medium">
                      {selectedProfessor.employeeId || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Department
                    </label>
                    <p className="font-medium">
                      {selectedProfessor.department || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Admin Position
                    </label>
                    <p className="font-medium">
                      {selectedProfessor.adminPosition || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedProfessor.status || "active")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Workload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Academic Workload
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="rounded-full bg-blue-100 p-4 w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedProfessor.projects || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Projects
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="rounded-full bg-green-100 p-4 w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedProfessor.teams || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Teams Supervised
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="rounded-full bg-purple-100 p-4 w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold">
                      {selectedProfessor.students || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Students Mentored
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Department Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Department & Role
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Department
                    </label>
                    <p className="font-medium">
                      {selectedProfessor.department || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Role
                    </label>
                    <p className="font-medium capitalize">
                      {selectedProfessor.role || "Professor"}
                    </p>
                  </div>
                  {selectedProfessor.adminPosition && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Administrative Position
                      </label>
                      <p className="font-medium">
                        {selectedProfessor.adminPosition}
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Current Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedProfessor.status || "active")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Account Created
                    </label>
                    <p className="font-medium">
                      {formatDate(selectedProfessor.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </label>
                    <p className="font-medium">
                      {formatDate(selectedProfessor.updatedAt)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
