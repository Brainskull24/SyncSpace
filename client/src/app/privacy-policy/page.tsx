"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Users,
  Mail,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const router = useRouter();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          This Privacy Policy describes how SyncSpace collects, uses, and
          protects your personal information when you use our student
          collaboration platform.
        </p>
      </div>

      <div className="space-y-6">
        {/* Information We Collect */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Name, email address, and student ID</li>
                <li>• Academic information (major, year, courses)</li>
                <li>• Profile picture and bio (optional)</li>
                <li>• Skills and expertise tags</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Academic Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Project submissions and assignments</li>
                <li>• Team collaboration records</li>
                <li>• Performance metrics and grades</li>
                <li>• Communication logs within teams</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Usage Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Login times and platform usage patterns</li>
                <li>• Feature interactions and preferences</li>
                <li>• Device information and browser type</li>
                <li>• IP address and location data</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Educational Services</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Facilitate team formation and project collaboration</li>
                <li>• Track academic progress and performance</li>
                <li>• Enable communication between students and professors</li>
                <li>• Provide personalized learning recommendations</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Platform Improvement</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Analyze usage patterns to improve features</li>
                <li>• Troubleshoot technical issues and bugs</li>
                <li>• Develop new educational tools and resources</li>
                <li>• Ensure platform security and integrity</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Communication</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Send important academic notifications</li>
                <li>• Provide technical support and assistance</li>
                <li>• Share platform updates and new features</li>
                <li>• Facilitate emergency communications</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Information Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Within Your Institution</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Professors can access student work and progress in their
                  courses
                </li>
                <li>
                  • Academic advisors may view relevant academic performance
                  data
                </li>
                <li>
                  • IT administrators have access for technical support purposes
                </li>
                <li>
                  • Authorized university personnel for academic integrity
                  investigations
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Team Members</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Profile information and skills are visible to team members
                </li>
                <li>
                  • Project contributions and activity are shared within teams
                </li>
                <li>
                  • Communication logs are accessible to all team participants
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">We Do NOT Share</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Personal information with third-party advertisers</li>
                <li>• Academic records with unauthorized external parties</li>
                <li>• Private communications outside of educational context</li>
                <li>• Data for commercial purposes unrelated to education</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Data Security & Protection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Security Measures</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• End-to-end encryption for sensitive communications</li>
                <li>• Secure servers with regular security updates</li>
                <li>• Multi-factor authentication for account protection</li>
                <li>• Regular security audits and vulnerability assessments</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Data Retention</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Academic records retained according to university policies
                </li>
                <li>
                  • Personal information deleted upon graduation or withdrawal
                </li>
                <li>
                  • Communication logs archived for academic integrity purposes
                </li>
                <li>• Usage analytics anonymized after 2 years</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Your Privacy Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Access & Control</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• View all personal data we have collected</li>
                  <li>• Update or correct your information</li>
                  <li>• Download your academic records</li>
                  <li>• Control privacy settings and visibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Management</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Request deletion of personal information</li>
                  <li>• Opt-out of non-essential communications</li>
                  <li>• Restrict processing for specific purposes</li>
                  <li>• File complaints with data protection authorities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </CardTitle>
            <CardDescription>
              Questions about this Privacy Policy or your data? We're here to
              help.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Privacy Officer</h4>
                <p className="text-sm text-muted-foreground">
                  Email: privacy@syncspace.edu
                  <br />
                  Phone: (555) 123-4567
                  <br />
                  Office: Student Services Building, Room 201
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Technical Support</h4>
                <p className="text-sm text-muted-foreground">
                  Email: support@syncspace.edu
                  <br />
                  Phone: (555) 123-4568
                  <br />
                  Hours: Mon-Fri, 8 AM - 6 PM
                </p>
              </div>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Mailing Address:</strong>
                <br />
                SyncSpace Privacy Office
                <br />
                University Technology Services
                <br />
                123 University Drive
                <br />
                College Town, ST 12345
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. We will notify users of
              significant changes via email and platform notifications.
              Continued use of SyncSpace after policy updates constitutes
              acceptance of the revised terms.
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Last Updated:</strong> January 15, 2024
                <br />
                <strong>Effective Date:</strong> January 15, 2024
                <br />
                <strong>Version:</strong> 2.1
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
