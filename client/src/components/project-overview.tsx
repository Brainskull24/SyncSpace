"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Eye, FileEdit, PieChartIcon, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case "pending":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800">
          Pending
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export function ProjectOverview() {
  const [projects, setProjects] = useState<any[]>([]);
  const projectData = [
    {
      name: "Active",
      value: projects.filter((p) => p.status === "Active").length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Pending",
      value: projects.filter((p) => p.status === "Pending").length,
      color: "hsl(var(--chart-3))",
    },
    {
      name: "Cancelled",
      value: projects.filter((p) => p.status === "Cancelled").length,
      color: "hsl(var(--chart-4))",
    },
  ];

  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    getAllProjects();
    const intervalId = setInterval(getAllProjects, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const getAllProjects = async () => {
    try {
      const { data } = await api.get("/projects/allprojects");
      setProjects(data.listings || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError("Failed to load project data.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Projects Overview</CardTitle>
          <CardDescription>Distribution of projects by status</CardDescription>
        </div>
        <PieChartIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="mb-6 justify-center flex h-[200px]">
          <ChartContainer
            config={{
              active: { label: "Active", color: "hsl(var(--chart-1))" },
              completed: { label: "Completed", color: "hsl(var(--chart-2))" },
              pending: { label: "Pending", color: "hsl(var(--chart-3))" },
              cancelled: { label: "Cancelled", color: "hsl(var(--chart-4))" },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {projectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-6">
          <h3 className="mb-4 text-sm font-medium">
            Recent Project Activities
          </h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.slice(0, 5).map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell className="text-center">
                      {project.maxTeams}
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={()=>{
                          router.push(`/admin-dashboard/project-buckets/${project._id}/edit`)
                        }}>
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => {
            router.push("/admin-dashboard/project-buckets/bulk-create");
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Project Bucket
        </Button>
      </CardFooter>
    </Card>
  );
}
