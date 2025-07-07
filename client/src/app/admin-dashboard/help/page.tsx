"use client";

import { Textarea } from "@/components/ui/textarea";

import { SelectItem } from "@/components/ui/select";

import { SelectContent } from "@/components/ui/select";

import { SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@/components/ui/select";

import { Select } from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  HelpCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  FileText,
  Video,
  Users,
  Zap,
} from "lucide-react";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create a new project bucket?",
        answer:
          "To create a new project bucket, navigate to the Project Buckets page and click the 'Create New Project' button. Fill out the required information including project title, description, technical requirements, and team settings.",
      },
      {
        question: "How do I assign professors to projects?",
        answer:
          "In the project creation form, go to the 'Professor Assignment' section. Select a primary supervisor from the dropdown menu. You can also optionally assign a co-supervisor for additional support.",
      },
      {
        question: "What are the different project statuses?",
        answer:
          "Projects can have the following statuses: Active (currently accepting applications), Draft (not yet published), Pending (awaiting approval), and Completed (finished projects).",
      },
    ],
  },
  {
    category: "Project Management",
    questions: [
      {
        question: "How do I monitor team progress?",
        answer:
          "Use the Analytics dashboard to view team performance metrics, completion rates, and project status. You can also access individual project details for more specific information.",
      },
      {
        question: "Can I modify project requirements after publication?",
        answer:
          "Yes, you can edit project details even after publication. However, major changes should be communicated to existing applicants and teams.",
      },
      {
        question: "How do I handle team conflicts?",
        answer:
          "Contact the assigned professor first. If needed, use the communication tools in the platform or escalate to the admin team through the support system.",
      },
    ],
  },
  {
    category: "Technical Issues",
    questions: [
      {
        question: "Why can't I upload files?",
        answer:
          "Check that your files are within the size limit (10MB) and are in supported formats (PDF, DOC, DOCX, TXT, MD). Clear your browser cache if the issue persists.",
      },
      {
        question: "How do I reset a user's password?",
        answer:
          "Go to the Professors page, find the user, and use the dropdown menu to access password reset options. The user will receive an email with reset instructions.",
      },
      {
        question: "The system is running slowly. What should I do?",
        answer:
          "Check the system status in Settings > Advanced. You may need to clear the cache or contact technical support if the issue persists.",
      },
    ],
  },
];

const quickLinks = [
  {
    title: "User Guide",
    icon: Book,
    description: "Complete guide for using SyncSpace",
    href: "#",
  },
  {
    title: "Video Tutorials",
    icon: Video,
    description: "Step-by-step video instructions",
    href: "#",
  },
  {
    title: "API Documentation",
    icon: FileText,
    description: "Technical documentation for developers",
    href: "#",
  },
  {
    title: "Best Practices",
    icon: Zap,
    description: "Tips for effective project management",
    href: "#",
  },
];

const supportChannels = [
  {
    title: "Email Support",
    icon: Mail,
    description: "Get help via email within 24 hours",
    contact: "support@syncspace.edu",
    availability: "24/7",
  },
  {
    title: "Phone Support",
    icon: Phone,
    description: "Speak directly with our support team",
    contact: "+1 (555) 123-HELP",
    availability: "Mon-Fri 9AM-5PM",
  },
  {
    title: "Live Chat",
    icon: MessageSquare,
    description: "Real-time chat support",
    contact: "Available in-app",
    availability: "Mon-Fri 9AM-5PM",
  },
  {
    title: "Community Forum",
    icon: Users,
    description: "Connect with other administrators",
    contact: "forum.syncspace.edu",
    availability: "24/7",
  },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers, guides, and get support for SyncSpace
        </p>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search for help articles, FAQs, or guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFAQ.length > 0 ? (
                <div className="space-y-6">
                  {filteredFAQ.map((category, categoryIndex) => (
                    <div key={categoryIndex}>
                      <h3 className="text-lg font-semibold mb-4">
                        {category.category}
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${categoryIndex}-${faqIndex}`}
                          >
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No FAQs found matching your search.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <link.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{link.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {link.description}
                      </p>
                      <Button variant="outline" size="sm">
                        View Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started Checklist</CardTitle>
              <CardDescription>
                Essential steps to set up your SyncSpace system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { task: "Configure system settings", completed: true },
                  { task: "Add professor accounts", completed: true },
                  {
                    task: "Create your first project bucket",
                    completed: false,
                  },
                  { task: "Set up notification preferences", completed: false },
                  { task: "Configure integrations", completed: false },
                  { task: "Test student registration flow", completed: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={
                        item.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {item.task}
                    </span>
                    {item.completed && (
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800"
                      >
                        Done
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportChannels.map((channel, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <channel.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{channel.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {channel.description}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{channel.contact}</p>
                        <p className="text-xs text-muted-foreground">
                          {channel.availability}
                        </p>
                      </div>
                      <Button className="mt-4" size="sm">
                        Get Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current status of SyncSpace services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    service: "Main Application",
                    status: "Operational",
                    color: "green",
                  },
                  {
                    service: "Database",
                    status: "Operational",
                    color: "green",
                  },
                  {
                    service: "File Storage",
                    status: "Operational",
                    color: "green",
                  },
                  {
                    service: "Email Service",
                    status: "Degraded Performance",
                    color: "yellow",
                  },
                  { service: "API", status: "Operational", color: "green" },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span className="font-medium">{service.service}</span>
                    <Badge
                      variant="outline"
                      className={
                        service.color === "green"
                          ? "bg-green-100 text-green-800"
                          : service.color === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {service.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">General Support</Label>
                  <p className="text-sm">support@syncspace.edu</p>
                  <p className="text-sm">+1 (555) 123-HELP</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Technical Support
                  </Label>
                  <p className="text-sm">tech@syncspace.edu</p>
                  <p className="text-sm">+1 (555) 123-TECH</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Emergency Contact
                  </Label>
                  <p className="text-sm">emergency@syncspace.edu</p>
                  <p className="text-sm">+1 (555) 911-HELP</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Office Hours</Label>
                  <p className="text-sm">
                    Monday - Friday: 9:00 AM - 5:00 PM EST
                  </p>
                  <p className="text-sm">Emergency support: 24/7</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Submit a Ticket</CardTitle>
                <CardDescription>
                  Create a support ticket for detailed assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-subject">Subject</Label>
                  <Input
                    id="ticket-subject"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticket-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ticket-description">Description</Label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Provide detailed information about your issue..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button className="w-full">Submit Ticket</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
