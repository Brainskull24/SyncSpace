"use client";
import { useMemo } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ExcelUploadSection } from "@/components/bulk-upload/excel-upload-section";
import { InlineEntrySection } from "@/components/bulk-upload/inline-entry-section";
import { SmartEntrySection } from "@/components/bulk-upload/smart-entry-section";
import { ProjectPreviewTable } from "@/components/bulk-upload/project-preview-table";
import { VersionControlSection } from "@/components/bulk-upload/version-control-section";
import { toast } from "sonner";
import { Upload, Table, Zap, Eye, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "@/lib/axios";
import CommonBucketData from "@/components/bulk-upload/common-bucket-data";

export interface BulkProjectData {
  title: string;
  description: string;
  category: string;
  difficulty: string;
  // duration?: number;
  technologies: string[];
  prerequisites?: string;
  maxTeams: number;
  supervisorEmail: string;
  coSupervisorEmail: String;
  department: string;
  budget?: number;
}

export interface CommonBucketData {
  minTeamSize?: number;
  maxTeamSize?: number;
  applicationDeadline?: string;
  projectStartDate?: string;
  projectEndDate?: string;
}

export interface VersionInfo {
  name: string;
  description: string;
  semester: string;
  department: string;
  tags: string[];
}

export default function BulkCreateProjectsPage() {
  const [activeTab, setActiveTab] = useState("excel");
  const [projects, setProjects] = useState<BulkProjectData[]>([]);
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    name: "",
    description: "",
    semester: "",
    department: "",
    tags: [],
  });
  const [commonBucketData, setcommonBucketData] = useState<CommonBucketData>({
    minTeamSize: 0,
    maxTeamSize: 0,
    applicationDeadline: "",
    projectStartDate: "",
    projectEndDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 25;

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const paginatedProjects = useMemo(
    () =>
      projects.slice(
        (currentPage - 1) * projectsPerPage,
        currentPage * projectsPerPage
      ),
    [projects, currentPage]
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleProjectsUpdate = (newProjects: BulkProjectData[]) => {
    setProjects(newProjects);
  };

  const handleSubmit = async () => {
    if (projects.length === 0) {
      toast("No Projects to Submit", {
        description: "Please add some projects before submitting.",
      });
      return;
    }

    if (!versionInfo.name || !versionInfo.semester) {
      toast("Version Information Required", {
        description: "Please fill in the version name and semester.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/projects/bulk-create", {
        projects,
        versionInfo,
        commonBucketData,
      });

      if (response.status === 200 || response.status === 201) {
        toast("Projects Created Successfully!", {
          description: `${projects.length} projects have been created and organized under "${versionInfo.name}".`,
        });

        setProjects([]);
        setVersionInfo({
          name: "",
          description: "",
          semester: "",
          department: "",
          tags: [],
        });
        setcommonBucketData({
          minTeamSize: 0,
          maxTeamSize: 0,
          applicationDeadline: "",
          projectStartDate: "",
          projectEndDate: "",
        });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error: any) {
      toast("Error", {
        description:
          error?.response?.data?.message ||
          "Failed to create projects. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin-dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin-dashboard/project-buckets">
              Project Buckets
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bulk Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Bulk Create Projects
            </h1>
            <p className="text-muted-foreground">
              Upload multiple projects at once using Excel, CSV, or inline entry
            </p>
          </div>
          <Link href="/admin-dashboard/project-buckets">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Choose Upload Method</CardTitle>
              <CardDescription>
                Select how you'd like to add multiple projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="excel"
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Excel/CSV
                  </TabsTrigger>
                  <TabsTrigger
                    value="inline"
                    className="flex items-center gap-2"
                  >
                    <Table className="h-4 w-4" />
                    Inline Entry
                  </TabsTrigger>
                  <TabsTrigger
                    value="smart"
                    className="flex items-center gap-2"
                  >
                    <Zap className="h-4 w-4" />
                    Smart Entry
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="excel" className="mt-6">
                  <ExcelUploadSection onProjectsUpdate={handleProjectsUpdate} />
                </TabsContent>

                <TabsContent value="inline" className="mt-6">
                  <span>Coming soon.....</span>
                  {/* <InlineEntrySection projects={projects} onProjectsUpdate={handleProjectsUpdate} /> */}
                </TabsContent>

                <TabsContent value="smart" className="mt-6">
                  <span>Coming soon.....</span>
                  {/* <SmartEntrySection onProjectsUpdate={handleProjectsUpdate} /> */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Projects Ready
                </span>
                <Badge variant="outline">{projects.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Unique Departments
                </span>
                <Badge variant="outline">
                  {
                    new Set(projects.map((p) => p.department).filter(Boolean))
                      .size
                  }
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total Teams
                </span>
                <Badge variant="outline">
                  {projects.reduce((sum, p) => sum + (p.maxTeams || 0), 0)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips & Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-900">Excel Upload</p>
                <p className="text-blue-700">
                  Download our template for fastest setup. Supports up to 100
                  projects.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-900">Inline Entry</p>
                <p className="text-green-700">
                  Perfect for 5-15 projects. Copy-paste friendly interface.
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-900">Smart Entry</p>
                <p className="text-purple-700">
                  Paste plain text and let AI parse project details
                  automatically.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Button onClick={handleSubmit} className="w-full" size="lg">
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Creating Projects...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create {projects.length} Projects
                    </>
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  All projects will be created and organized under your version
                  settings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 my-6">
        <CommonBucketData
          commonBucketData={commonBucketData}
          onCommonBucketDataUpdate={setcommonBucketData}
        />

        <VersionControlSection
          versionInfo={versionInfo}
          onVersionInfoUpdate={setVersionInfo}
        />
      </div>

      {projects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Project Preview ({projects.length} projects)
            </CardTitle>
            <CardDescription>
              Showing page {currentPage} of {totalPages} — {projectsPerPage} per
              page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProjectPreviewTable
              projects={paginatedProjects}
              onProjectsUpdate={(updatedPageProjects) => {
                const start = (currentPage - 1) * projectsPerPage;
                const newProjects = [...projects];
                for (let i = 0; i < updatedPageProjects.length; i++) {
                  newProjects[start + i] = updatedPageProjects[i];
                }
                setProjects(newProjects);
              }}
            />

            {/* Pagination controls */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
