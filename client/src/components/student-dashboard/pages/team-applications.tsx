import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Users,
  ExternalLink,
  Github,
  Globe,
} from "lucide-react";
import { Page } from "@/types/student-pages";

const projects = [
  {
    id: 1,
    name: "E-commerce Platform",
    description:
      "A comprehensive e-commerce solution with modern UI/UX, payment integration, and inventory management.",
    status: "In Progress",
    progress: 75,
    priority: "High",
    startDate: "Jan 2024",
    endDate: "Apr 2024",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    team: [
      { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
      {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      { name: "Anna Kowalski", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    features: [
      "Product Catalog",
      "Shopping Cart",
      "Payment Processing",
      "Order Management",
      "Admin Dashboard",
    ],
    links: {
      demo: "https://demo.ecommerce.syncspace.com",
      github: "https://github.com/syncspace/ecommerce-platform",
      live: "https://ecommerce.syncspace.com",
    },
  },
  {
    id: 2,
    name: "Mobile App",
    description:
      "Cross-platform mobile application for iOS and Android with real-time synchronization and offline support.",
    status: "In Progress",
    progress: 60,
    priority: "High",
    startDate: "Feb 2024",
    endDate: "Jun 2024",
    techStack: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
    team: [
      { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Lisa Thompson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    features: [
      "User Authentication",
      "Real-time Chat",
      "Push Notifications",
      "Offline Mode",
      "Data Sync",
    ],
    links: {
      github: "https://github.com/syncspace/mobile-app",
    },
  },
  {
    id: 3,
    name: "API Gateway",
    description:
      "Centralized API gateway for microservices architecture with authentication, rate limiting, and monitoring.",
    status: "In Progress",
    progress: 85,
    priority: "Medium",
    startDate: "Dec 2023",
    endDate: "Mar 2024",
    techStack: ["Node.js", "Express", "Redis", "Docker", "Kubernetes"],
    team: [
      { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "James Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    features: [
      "API Routing",
      "Authentication",
      "Rate Limiting",
      "Monitoring",
      "Load Balancing",
    ],
    links: {
      github: "https://github.com/syncspace/api-gateway",
      docs: "https://docs.syncspace.com/api-gateway",
    },
  },
  {
    id: 4,
    name: "Dashboard Redesign",
    description:
      "Complete redesign of the admin dashboard with improved UX, data visualization, and responsive design.",
    status: "Completed",
    progress: 100,
    priority: "Medium",
    startDate: "Oct 2023",
    endDate: "Jan 2024",
    techStack: ["Vue.js", "D3.js", "Tailwind CSS", "Chart.js"],
    team: [
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Lisa Thompson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    features: [
      "Data Visualization",
      "Responsive Design",
      "Dark Mode",
      "Custom Widgets",
      "Export Features",
    ],
    links: {
      live: "https://dashboard.syncspace.com",
      github: "https://github.com/syncspace/dashboard-redesign",
    },
  },
  {
    id: 5,
    name: "Client Portal",
    description:
      "Self-service portal for clients to manage their accounts, view reports, and communicate with the team.",
    status: "In Progress",
    progress: 45,
    priority: "Medium",
    startDate: "Mar 2024",
    endDate: "Jul 2024",
    techStack: ["Next.js", "Prisma", "NextAuth", "Tailwind CSS"],
    team: [
      { name: "Lisa Thompson", avatar: "/placeholder.svg?height=32&width=32" },
      {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      { name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    features: [
      "Account Management",
      "Report Generation",
      "Communication Hub",
      "Document Sharing",
      "Billing",
    ],
    links: {
      github: "https://github.com/syncspace/client-portal",
    },
  },
  {
    id: 6,
    name: "Component Library",
    description:
      "Reusable UI component library with comprehensive documentation and design system guidelines.",
    status: "Completed",
    progress: 100,
    priority: "Low",
    startDate: "Aug 2023",
    endDate: "Nov 2023",
    techStack: ["React", "Storybook", "TypeScript", "Styled Components"],
    team: [
      { name: "Michael Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    features: [
      "UI Components",
      "Design Tokens",
      "Documentation",
      "Testing",
      "NPM Package",
    ],
    links: {
      live: "https://components.syncspace.com",
      github: "https://github.com/syncspace/component-library",
      npm: "https://npmjs.com/package/@syncspace/components",
    },
  },
];

interface TeamApplicationProps {
  onNavigate: (page: Page) => void;
}

export default function ProjectsPage({ onNavigate }: TeamApplicationProps) {
  const inProgressProjects = projects.filter(
    (p) => p.status === "In Progress"
  ).length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;
  const totalProjects = projects.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">SyncSpace</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/team" className="text-gray-600 hover:text-gray-900">
                Team
              </Link>
              <Link href="/projects" className="text-gray-900 font-medium">
                Projects
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Project Applications
            </h1>
            <p className="text-gray-600">
              Manage and track all your active projects and applications
            </p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {inProgressProjects}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedProjects}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                      className={
                        project.status === "Completed" ? "bg-green-500" : ""
                      }
                    >
                      {project.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        project.priority === "High"
                          ? "border-red-500 text-red-500"
                          : project.priority === "Medium"
                          ? "border-yellow-500 text-yellow-600"
                          : "border-gray-500 text-gray-500"
                      }
                    >
                      {project.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Timeline */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {project.startDate} - {project.endDate}
                    </span>
                  </div>
                </div>

                {/* Team */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">
                      Team ({project.team.length})
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.team.map((member, index) => (
                      <Avatar
                        key={index}
                        className="w-8 h-8 border-2 border-white"
                      >
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                        />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features</h4>
                  <div className="space-y-1">
                    {project.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="text-xs text-gray-600">
                        • {feature}
                      </div>
                    ))}
                    {project.features.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{project.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-2">
                  {project.links.live && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
