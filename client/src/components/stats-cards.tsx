import { Card, CardContent } from "@/components/ui/card";
import { useProjectContext } from "@/context/ProjectContext";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckCircle2,
  FileStack,
  Users,
} from "lucide-react";
import { useEffect } from "react";

export function StatsCards() {
  const { projects } = useProjectContext();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Active Projects
            </p>
            <p className="text-3xl font-bold">{projects.filter((p) => p.status === "Active").length}</p>
            <div className="mt-1 flex items-center text-sm text-green-600">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              <span>12% increase</span>
            </div>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <FileStack className="h-6 w-6 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Teams Formed
            </p>
            <p className="text-3xl font-bold">156</p>
            <div className="mt-1 flex items-center text-sm text-green-600">
              <ArrowUpIcon className="mr-1 h-4 w-4" />
              <span>8.5% increase</span>
            </div>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Professors Assigned
            </p>
            <p className="text-3xl font-bold">28</p>
            <div className="mt-1 flex items-center text-sm text-amber-600">
              <span>Optimal workload</span>
            </div>
          </div>
          <div className="rounded-full bg-amber-100 p-3">
            <Users className="h-6 w-6 text-amber-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </p>
            <p className="text-3xl font-bold">78%</p>
            <div className="mt-1 flex items-center text-sm text-red-600">
              <ArrowDownIcon className="mr-1 h-4 w-4" />
              <span>3% from last semester</span>
            </div>
          </div>
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
