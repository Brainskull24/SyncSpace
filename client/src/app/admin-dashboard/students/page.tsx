"use client";

import { useEffect, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Mail,
  Phone,
  Users,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Calendar,
  User,
  Building,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import Papa from "papaparse";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [students, setStudents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const [sortBy, setSortBy] = useState<"year" | "team">("year");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getAllStudents();
    const intervalId = setInterval(getAllStudents, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllStudents = async () => {
    try {
      const { data } = await api.get("/auth/students");
      setStudents(data.students || []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError("Failed to load student data.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId?.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "alloted") return student.isTeamAlloted && matchesSearch;
    if (activeTab === "not-alloted")
      return !student.isTeamAlloted && matchesSearch;
    if (activeTab === "detained") return student.isDetained && matchesSearch;
    return matchesSearch;
  });

  const handleExportCSV = () => {
    const csv = Papa.unparse(
      students.map((s) => ({
        Name: `${s.firstName} ${s.lastName}`,
        Email: s.email,
        StudentID: s.studentId,
        Department: s.department,
        AcademicYear: s.academicYear,
        TeamStatus: s.isTeamAlloted ? "Alloted" : "Not Alloted",
        Detained: s.isDetained ? "Yes" : "No",
        TeamName: s.team?.name || "N/A",
        Role: s.team ? (s.isTeamLead ? "Leader" : "Member") : "N/A",
        Project: s.isProjectAlloted ? s.project?.name || "N/A" : "N/A",
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "students_data.csv");
  };

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "year") return a.academicYear.localeCompare(b.academicYear);
    if (sortBy === "team")
      return Number(b.isTeamAlloted) - Number(a.isTeamAlloted);
    return 0;
  });

  const getStatusBadge = (isTeamAlloted?: boolean, isDetained?: boolean) => {
    if (isDetained) {
      return <Badge className="bg-red-100 text-red-700">Detained</Badge>;
    }
    if (isTeamAlloted) {
      return (
        <Badge className="bg-green-100 text-green-700">Team Alloted</Badge>
      );
    }
    return <Badge className="bg-gray-100 text-gray-500">Not Alloted</Badge>;
  };

  const handleViewProfile = (student: any) => {
    setSelectedStudent(student);
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

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage student information and academic progress
          </p>
        </div>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft />
          Back to Dashboard
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>
                <p className="text-2xl font-bold">{students.length}</p>
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
                  Students without Team
                </p>
                <p className="text-2xl font-bold">
                  {students.filter((s) => !s.isTeamAlloted).length}
                </p>
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
                  Detained Students
                </p>
                <p className="text-2xl font-bold">
                  {students.filter((s) => s.isDetained).length}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students, majors, or student IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>
            Manage student information and academic progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="alloted">Team Alloted</TabsTrigger>
              <TabsTrigger value="not-alloted">Not Alloted</TabsTrigger>
              <TabsTrigger value="detained">Detained</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Details</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Team Status</TableHead>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Project Assigned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedStudents
                  .slice(
                    (currentPage - 1) * studentsPerPage,
                    currentPage * studentsPerPage
                  )
                  .map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                student.profilePicture || `/?height=32&width=32`
                              }
                            />
                            <AvatarFallback>
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {student.firstName} {student.lastName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell className="text-center">
                        {student.academicYear}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(
                          student.isTeamAlloted,
                          student.isDetained
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.team ? student.team.name : "No Team"}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.team
                          ? student.isTeamLead
                            ? "Leader"
                            : "Member"
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.isProjectAlloted
                          ? student.project.name
                          : "N/A"}
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
                            <DropdownMenuItem
                              onClick={() => handleViewProfile(student)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Call Student
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage * studentsPerPage >= sortedStudents.length}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    selectedStudent?.profilePicture || `/?height=48&width=48`
                  }
                />
                <AvatarFallback>
                  {selectedStudent?.firstName?.[0]}
                  {selectedStudent?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedStudent?.firstName} {selectedStudent?.lastName}
                </h2>
                <p className="text-muted-foreground font-normal">
                  {selectedStudent?.role === "student"
                    ? "Student"
                    : selectedStudent?.role}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Complete profile information and academic details
            </DialogDescription>
          </DialogHeader>

          {selectedStudent && (
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
                      {selectedStudent.firstName} {selectedStudent.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <p className="font-medium">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <p className="font-medium">
                      {formatPhoneNumber(
                        selectedStudent.countryCode,
                        selectedStudent.phoneNumber
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      University ID
                    </label>
                    <p className="font-medium">
                      {selectedStudent.universityId || "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Student ID
                    </label>
                    <p className="font-medium">{selectedStudent.studentId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Department
                    </label>
                    <p className="font-medium">{selectedStudent.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Academic Year
                    </label>
                    <p className="font-medium">
                      {selectedStudent.academicYear}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Graduation Year
                    </label>
                    <p className="font-medium">
                      {selectedStudent.graduationYear || "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Status Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Status Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Team Allocation
                        </span>
                        {selectedStudent.isTeamAlloted ? (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Allocated
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Allocated
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Project Allocation
                        </span>
                        {selectedStudent.isProjectAlloted ? (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Allocated
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">
                            <XCircle className="h-3 w-3 mr-1" />
                            Not Allocated
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Team Leadership
                        </span>
                        {selectedStudent.isTeamLead ? (
                          <Badge className="bg-blue-100 text-blue-700">
                            <Crown className="h-3 w-3 mr-1" />
                            Team Leader
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">
                            Member
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Academic Status
                        </span>
                        {selectedStudent.isDetained ? (
                          <Badge className="bg-red-100 text-red-700">
                            <Clock className="h-3 w-3 mr-1" />
                            Detained
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team and Project Information */}
              {(selectedStudent.team || selectedStudent.project) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Team & Project Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStudent.team && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Team Name
                        </label>
                        <p className="font-medium">
                          {selectedStudent.team.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Role:{" "}
                          {selectedStudent.isTeamLead
                            ? "Team Leader"
                            : "Team Member"}
                        </p>
                      </div>
                    )}
                    {selectedStudent.project && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Project Name
                        </label>
                        <p className="font-medium">
                          {selectedStudent.project.name}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

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
                      {formatDate(selectedStudent.createdAt)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Last Updated
                    </label>
                    <p className="font-medium">
                      {formatDate(selectedStudent.updatedAt)}
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
