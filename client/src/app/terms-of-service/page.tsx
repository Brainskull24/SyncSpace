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
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Users,
  AlertTriangle,
  Scale,
  Gavel,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface TermsOfServiceProps {
  onNavigate: (page: string) => void;
}

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {
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
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2024</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          These Terms of Service govern your use of the SyncSpace platform. By
          accessing or using our services, you agree to be bound by these terms.
        </p>
      </div>

      <div className="space-y-6">
        {/* Acceptance of Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              By creating an account or using SyncSpace, you acknowledge that
              you have read, understood, and agree to be bound by these Terms of
              Service and our Privacy Policy. If you do not agree to these
              terms, you may not use our platform.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Educational Use Only
                  </h4>
                  <p className="text-sm text-blue-800">
                    SyncSpace is designed exclusively for educational purposes
                    within accredited academic institutions. Commercial use is
                    strictly prohibited.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Accounts & Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Account Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Must be a currently enrolled student or authorized faculty
                  member
                </li>
                <li>
                  • Must use official institutional email address for
                  registration
                </li>
                <li>• Must provide accurate and complete information</li>
                <li>
                  • Must be at least 18 years old or have parental consent
                </li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Account Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • You are responsible for maintaining account confidentiality
                </li>
                <li>
                  • Must use strong passwords and enable two-factor
                  authentication
                </li>
                <li>• Must immediately report any unauthorized access</li>
                <li>• Cannot share account credentials with others</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Account Termination</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Accounts automatically deactivated upon graduation or
                  withdrawal
                </li>
                <li>
                  • We reserve the right to suspend accounts for policy
                  violations
                </li>
                <li>• Users may request account deletion at any time</li>
                <li>
                  • Academic records may be retained per institutional policies
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Acceptable Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              Acceptable Use Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-green-600">
                Permitted Uses
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Collaborate on academic projects and assignments</li>
                <li>• Form teams for coursework and research</li>
                <li>• Share educational resources and materials</li>
                <li>• Communicate with classmates and instructors</li>
                <li>• Submit assignments and receive feedback</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2 text-red-600">
                Prohibited Activities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-1">Academic Misconduct</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Plagiarism or unauthorized copying</li>
                    <li>• Sharing answers to individual assignments</li>
                    <li>• Impersonating other students</li>
                    <li>• Falsifying academic records</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Platform Misuse</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Harassment or discriminatory behavior</li>
                    <li>• Sharing inappropriate content</li>
                    <li>• Attempting to hack or exploit the system</li>
                    <li>• Commercial or promotional activities</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Integrity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Academic Integrity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">
                    Important Notice
                  </h4>
                  <p className="text-sm text-yellow-800">
                    All academic work submitted through SyncSpace is subject to
                    your institution's academic integrity policies. Violations
                    may result in serious academic consequences.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Your Responsibilities</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Ensure all submitted work is original or properly cited
                </li>
                <li>• Respect intellectual property rights of others</li>
                <li>• Follow your instructor's collaboration guidelines</li>
                <li>• Report suspected academic misconduct</li>
                <li>• Maintain honesty in all academic interactions</li>
              </ul>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">Monitoring & Enforcement</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • Platform activities may be monitored for integrity
                  violations
                </li>
                <li>• Automated systems detect potential plagiarism</li>
                <li>
                  • Violations reported to appropriate academic authorities
                </li>
                <li>• Serious violations may result in account suspension</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Platform Content</h4>
              <p className="text-sm text-muted-foreground mb-2">
                SyncSpace and its original content, features, and functionality
                are owned by the platform and protected by copyright, trademark,
                and other laws.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-semibold mb-2">User-Generated Content</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• You retain ownership of your original academic work</li>
                <li>
                  • You grant us license to host and display your content for
                  educational purposes
                </li>
                <li>
                  • You are responsible for ensuring you have rights to any
                  content you upload
                </li>
                <li>
                  • We may remove content that violates intellectual property
                  rights
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Service Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Service Availability & Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Service Commitment</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 99.5% uptime target during academic terms</li>
                  <li>• Regular maintenance windows announced in advance</li>
                  <li>• 24/7 technical support during peak periods</li>
                  <li>• Data backup and recovery procedures</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Limitations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Service provided "as is" without warranties</li>
                  <li>• Not liable for indirect or consequential damages</li>
                  <li>• May modify or discontinue features with notice</li>
                  <li>• Subject to institutional technology policies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Data Handling</CardTitle>
            <CardDescription>
              Your privacy is important to us. Please review our Privacy Policy
              for detailed information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">Privacy Policy</h4>
                <p className="text-sm text-muted-foreground">
                  Learn how we collect, use, and protect your personal
                  information.
                </p>
              </div>
              <Button variant="outline" onClick={() => onNavigate("privacy")}>
                View Policy
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Points</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>
                  • We collect only necessary information for educational
                  purposes
                </li>
                <li>
                  • Your data is not sold or shared with third parties for
                  commercial purposes
                </li>
                <li>• You have control over your privacy settings and data</li>
                <li>
                  • We comply with FERPA and other applicable privacy laws
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Modifications */}
        <Card>
          <CardHeader>
            <CardTitle>Terms Modifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time.
              We will notify users of significant changes via email and platform
              notifications at least 30 days before they take effect.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Email Notification</Badge>
              <Badge variant="outline">30-Day Notice</Badge>
              <Badge variant="outline">Platform Announcement</Badge>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Current Version:</strong> 3.2
                <br />
                <strong>Last Updated:</strong> January 15, 2024
                <br />
                <strong>Effective Date:</strong> February 15, 2024
                <br />
                <strong>Next Review:</strong> July 2024
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Contact & Support</CardTitle>
            <CardDescription>
              Questions about these terms? Need help with the platform? We're
              here to assist you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Legal Questions</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Terms of Service inquiries
                </p>
                <p className="text-sm">legal@syncspace.edu</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Technical Support</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Platform issues and bugs
                </p>
                <p className="text-sm">support@syncspace.edu</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Academic Support</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Educational guidance
                </p>
                <p className="text-sm">academic@syncspace.edu</p>
              </div>
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                <strong>General Inquiries:</strong> info@syncspace.edu | (555)
                123-4567
                <br />
                <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 6:00
                PM EST
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
