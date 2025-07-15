"use client";
import * as XLSX from "xlsx";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { BulkProjectData } from "../../app/admin-dashboard/project-buckets/bulk-create/page";

interface ExcelUploadSectionProps {
  onProjectsUpdate: (projects: BulkProjectData[]) => void;
}

// Template data for download
const templateData = [
  {
    "Project Title": "AI-Powered Chatbot",
    Description:
      "Build an intelligent chatbot using natural language processing",
    Category: "ai-machine-learning",
    Objectives: "Objecttive1; Objective2",
    Difficulty: "Intermediate",
    Technologies: "Python; TensorFlow; Flask",
    "Max Teams": 2,
    "Supervisor Email": "prof.smith@university.edu",
    "Co Supervisor Email": "prof.smith@university.edu",
    Department: "Computer Science",
    Budget: 500,
    Prerequisites: "Python programming; Basic ML knowledge",
  },
  {
    "Project Title": "E-commerce Mobile App",
    Description:
      "Develop a cross-platform mobile application for online shopping",
    Category: "mobile-app-development",
    Objectives: "Objecttive1; Objective2",
    Difficulty: "Beginner",
    Technologies: "React Native; Node.js; MongoDB",
    "Max Teams": 3,
    "Supervisor Email": "prof.johnson@university.edu",
    "Co Supervisor Email": "prof.smith@university.edu",
    Department: "Software Engineering",
    Budget: 0,
    Prerequisites: "JavaScript; Basic mobile development",
  },
];

export function ExcelUploadSection({
  onProjectsUpdate,
}: ExcelUploadSectionProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [parsedData, setParsedData] = useState<BulkProjectData[]>([]);

  const downloadTemplate = () => {
    const headers = Object.keys(templateData[0]);
    const csvContent = [
      headers.join(","),
      ...templateData.map((row) =>
        headers
          .map((header) => `"${row[header as keyof typeof row]}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const parseCSVData = (csvText: string): BulkProjectData[] => {
    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length < 2) {
      console.warn("CSV must have at least 2 rows (headers + 1 data row)");
      return [];
    }

    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());
    console.log("Parsed Headers:", headers);

    const projects: BulkProjectData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.replace(/"/g, "").trim());
      console.log(`Row ${i} Values:`, values);

      if (values.length !== headers.length) {
        console.warn(`Row ${i} skipped due to mismatched column count`);
        continue;
      }

      try {
        const getVal = (key: string) => {
          const index = headers.indexOf(key);
          if (index === -1) {
            console.warn(`Missing header: ${key}`);
            return "";
          }
          return values[index];
        };

        const project: BulkProjectData = {
          title: getVal("Project Title"),
          description: getVal("Description"),
          category: getVal("Category"),
          difficulty: getVal("Difficulty") || "Beginner",
          technologies:
            getVal("Technologies")
              ?.split(";")
              .map((t) => t.trim()) || [],
          maxTeams: Number.parseInt(getVal("Max Teams")) || 1,
          supervisorEmail: getVal("Supervisor Email"),
          coSupervisorEmail: getVal("Co Supervisor Email"),
          department: getVal("Department"),
          budget: Number.parseInt(getVal("Budget")) || 0,
          prerequisites: getVal("Prerequisites"),
        };

        console.log(`Parsed Project ${i}:`, project);

        if (
          !project.title ||
          !project.description ||
          !project.supervisorEmail ||
          !project.coSupervisorEmail
        ) {
          console.warn(`Row ${i} skipped: missing required fields`);
          continue;
        }

        projects.push(project);
      } catch (err) {
        console.error(`Error parsing row ${i}:`, err);
      }
    }

    console.log("Total Projects Parsed:", projects.length);
    return projects;
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploadStatus("uploading");
      setUploadProgress(0);
      setErrorMessage("");

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        let projects: BulkProjectData[] = [];

        if (file.type === "text/csv") {
          const text = await file.text();
          projects = parseCSVData(text);
        } else {
          const data = await file.arrayBuffer();
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          projects = jsonData.map((row: any) => ({
            title: row["Project Title"] || "",
            description: row["Description"] || "",
            category: row["Category"] || "",
            difficulty: row["Difficulty"] || "Beginner",
            technologies:
              typeof row["Technologies"] === "string"
                ? row["Technologies"].split(";").map((t: string) => t.trim())
                : [],
            maxTeams: parseInt(row["Max Teams"]) || 1,
            supervisorEmail: row["Supervisor Email"] || "",
            coSupervisorEmail: row["Co Supervisor Email"] || "",
            department: row["Department"] || "",
            budget: parseInt(row["Budget"]) || 0,
            prerequisites: row["Prerequisites"] || "",
          }));
        }

        // Basic validation
        const invalidProjects = projects.filter(
          (p) => !p.title || !p.description || !p.supervisorEmail
        );
        if (invalidProjects.length > 0) {
          throw new Error(
            `${invalidProjects.length} projects are missing required fields`
          );
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        setParsedData(projects);
        onProjectsUpdate(projects);
        setUploadStatus("success");
      } catch (error) {
        setUploadStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to parse file"
        );
      }
    },
    [onProjectsUpdate]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="space-y-6">
      {/* Template Download */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Download Template</h3>
              <p className="text-sm text-muted-foreground">
                Get started with our pre-formatted template
              </p>
            </div>
            <Button onClick={downloadTemplate} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download CSV Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50",
          uploadStatus === "success" && "border-green-500 bg-green-50",
          uploadStatus === "error" && "border-red-500 bg-red-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          {uploadStatus === "success" ? (
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
          ) : uploadStatus === "error" ? (
            <AlertCircle className="mx-auto h-12 w-12 text-red-600" />
          ) : (
            <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
          )}

          {uploadStatus === "uploading" ? (
            <div className="space-y-2">
              <p className="text-primary">Uploading and parsing file...</p>
              <Progress
                value={uploadProgress}
                className="w-full max-w-xs mx-auto"
              />
            </div>
          ) : uploadStatus === "success" ? (
            <div>
              <p className="text-green-600 font-medium">
                File uploaded successfully!
              </p>
              <p className="text-sm text-muted-foreground">
                Parsed {parsedData.length} projects
              </p>
            </div>
          ) : uploadStatus === "error" ? (
            <div>
              <p className="text-red-600 font-medium">Upload failed</p>
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          ) : isDragActive ? (
            <p className="text-primary">Drop your file here...</p>
          ) : (
            <div>
              <p className="text-muted-foreground mb-2">
                Drag & drop your CSV/Excel file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports .csv and .xlsx files up to 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus === "success" && parsedData.length > 0 && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Successfully parsed {parsedData.length} projects. Review them in the
            preview section below.
          </AlertDescription>
        </Alert>
      )}

      {uploadStatus === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {errorMessage}. Please check your file format and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* File Format Guide */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-3">File Format Requirements</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline">Required</Badge>
              <span>Project Title, Description, Professor Email</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Technologies</Badge>
              <span>Separate multiple technologies with semicolons (;)</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Dates</Badge>
              <span>Use YYYY-MM-DD format</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Numbers</Badge>
              <span>Team sizes, duration, and budget should be numeric</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
