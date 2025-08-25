"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import {
  User,
  Shield,
  Bell,
  Lock,
  GraduationCap,
  Users,
  Plug,
  Palette,
  Download,
  HelpCircle,
  Camera,
  Check,
  X,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  ChevronRight,
  Save,
  AlertTriangle,
  Star,
  Award,
  FileText,
  Moon,
  Sun,
  Monitor,
  VolumeX,
  Accessibility,
  Languages,
  ArrowLeft,
  Loader2,
  Github,
  Chrome,
  MessageSquare,
  Link,
  BookOpen,
  LifeBuoy,
  MessageCircle,
  Search,
  Share,
  Video,
  Trash2,
  Edit,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AddSkillModal } from "@/components/add-skill-modal";
import { useUser } from "../../context/Authcontext";

export default function UserSettings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user, loading: userLoading, refreshUser } = useUser();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    dateOfBirth: "",
    gender: "prefer-not-to-say",
    bio: "",
    profilePicture: "/placeholder.svg?height=128&width=128",
    profilePictureFile: null as File | null,
    universityId: "",
    studentId: "",
    employeeId: "",
    academicYear: "",
    department: "",
    graduationYear: "",
    adminPosition: "",
    skills: [] as Array<{ skill: string; level: number; verified: boolean }>,
    settings: {
      notifications: {
        email: {
          teamInvitations: true,
          projectUpdates: true,
          assignmentDeadlines: true,
          weeklyDigest: false,
          marketingEmails: false,
        },
        push: {
          browser: true,
          newMessages: true,
          teamActivity: true,
          projectMilestones: true,
          systemAnnouncements: true,
        },
        quietHours: {
          enabled: false,
          startTime: "22:00",
          endTime: "08:00",
          days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
      },
      appearance: {
        theme: "system",
        fontSize: 16,
        highContrast: false,
      },
      accessibility: {
        screenReaderSupport: false,
        keyboardNavigation: true,
        reduceMotion: false,
        focusIndicators: true,
      },
      language: {
        displayLanguage: "en",
        timeZone: "est",
        dateFormat: "mdy",
      },
      privacy: {
        profileVisibility: "public",
        dataSharing: true,
        searchSettings: true,
        showEmail: false,
        personalizedContent: true,
      },
      team: {
        allowDirectMessages: true,
        projectAccessRequests: true,
        allowTeamInvitations: true,
        defaultRole: "member",
      },
      integrations: {
        github: { connected: false, username: "" },
        google: { connected: false, email: "" },
        apiAccess: false,
      },
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Initialize profile data when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        displayName:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName[0]}`
            : "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        countryCode: user.countryCode || "+1",
        profilePicture:
          user.profilePicture || "/placeholder.svg?height=128&width=128",
        universityId: user.universityId || "",
        studentId: user.studentId || "",
        employeeId: user.employeeId || "",
        academicYear: user.academicYear || "",
        department: user.department || "",
        graduationYear: user.graduationYear || "",
        adminPosition: user.adminPosition || "",
        // Initialize with some default skills if none exist
        skills:
          prev.skills.length === 0
            ? [
                { skill: "React", level: 85, verified: true },
                { skill: "Node.js", level: 70, verified: false },
                { skill: "Python", level: 90, verified: true },
                { skill: "UI/UX Design", level: 60, verified: false },
              ]
            : prev.skills,
      }));
    }
  }, [user]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [userLoading, user, router]);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    let feedback = "";
    let color = "bg-red-500";

    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9!@#$%^&*()]/.test(password)) strength += 25;

    if (strength === 100) {
      feedback = "Very Strong";
      color = "bg-green-500";
    } else if (strength >= 75) {
      feedback = "Strong";
      color = "bg-blue-500";
    } else if (strength >= 50) {
      feedback = "Medium";
      color = "bg-yellow-500";
    } else {
      feedback = "Weak";
      color = "bg-red-500";
    }

    return { strength, feedback, color };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  const settingsMenu = [
    {
      id: "profile",
      label: "Profile Information",
      icon: User,
      completion: 85,
      subsections: [
        "Personal Details",
        "Contact Information",
        "Bio & Preferences",
      ],
    },
    {
      id: "security",
      label: "Account Security",
      icon: Shield,
      completion: 60,
      subsections: [
        "Password & Authentication",
        "Two-Factor Auth",
        "Active Sessions",
      ],
    },
    {
      id: "notifications",
      label: "Notification Preferences",
      icon: Bell,
      completion: 40,
      subsections: ["Email Notifications", "Push Notifications", "Quiet Hours"],
    },
    {
      id: "privacy",
      label: "Privacy Settings",
      icon: Lock,
      completion: 70,
      subsections: ["Profile Visibility", "Data Sharing", "Search Settings"],
    },
    {
      id: "academic",
      label: "Academic Information",
      icon: GraduationCap,
      completion: 90,
      subsections: ["University Details", "Academic History", "Achievements"],
    },
    {
      id: "team",
      label: "Team Preferences",
      icon: Users,
      completion: 50,
      subsections: [
        "Collaboration Settings",
        "Team Formation",
        "Communication",
      ],
    },
    {
      id: "integrations",
      label: "Integration Settings",
      icon: Plug,
      completion: 30,
      subsections: ["Connected Accounts", "API Access", "Third-party Apps"],
    },
    {
      id: "appearance",
      label: "Appearance & Accessibility",
      icon: Palette,
      completion: 80,
      subsections: ["Theme Settings", "Accessibility Options", "Language"],
    },
    {
      id: "data",
      label: "Data & Export",
      icon: Download,
      completion: 0,
      subsections: ["Data Management", "Export Options", "Account Actions"],
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      completion: 100,
      subsections: ["Documentation", "Contact Support", "Feedback"],
    },
  ];

  const getCurrentSection = () => {
    return settingsMenu.find((section) => section.id === activeSection);
  };

  const handleProfileInputChange = useCallback(
    (field: string, value: string | File | null) => {
      if (field === "profilePictureFile" && value instanceof File) {
        setProfileData((prev) => ({
          ...prev,
          profilePictureFile: value,
          profilePicture: URL.createObjectURL(value),
        }));
      } else {
        setProfileData((prev) => ({ ...prev, [field]: value }));
      }
      setHasUnsavedChanges(true);
    },
    []
  );

  const handleNestedInputChange = useCallback((path: string[], value: any) => {
    setProfileData((prev) => {
      const newProfileData = { ...prev };
      let current: any = newProfileData;
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newProfileData;
    });
    setHasUnsavedChanges(true);
  }, []);

  const handlePasswordInputChange = useCallback(
    (field: string, value: string) => {
      setPasswordData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleAddSkill = (newSkill: {
    skill: string;
    level: number;
    verified: boolean;
  }) => {
    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
    setHasUnsavedChanges(true);
  };

  const handleRemoveSkill = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Upload profile picture if a new file is selected
      let profilePictureUrl = profileData.profilePicture;
      if (profileData.profilePictureFile) {
        const formData = new FormData();
        formData.append("profilePicture", profileData.profilePictureFile);

        const uploadResponse = await fetch("/api/upload-profile-picture", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          profilePictureUrl = uploadResult.url;
          console.log("Profile picture uploaded:", uploadResult.url);
        }
      }

      // Save profile data
      const updateData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        displayName: profileData.displayName,
        email: profileData.email,
        phone: profileData.phone,
        countryCode: profileData.countryCode,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        bio: profileData.bio,
        profilePicture: profilePictureUrl,
        skills: profileData.skills,
        universityId: profileData.universityId,
        studentId: profileData.studentId,
        employeeId: profileData.employeeId,
        academicYear: profileData.academicYear,
        department: profileData.department,
        graduationYear: profileData.graduationYear,
        adminPosition: profileData.adminPosition,
        settings: profileData.settings,
      };

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedUser = await response.json();

        setHasUnsavedChanges(false);
        toast("Settings saved", {
          description: "Your profile settings have been updated successfully.",
        });
      } else {
        throw new Error("Failed to save profile data");
      }
    } catch (error) {
      console.error("Error saving profile data:", error);
      toast("Error", {
        description: "Failed to save your settings. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelChanges = () => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        displayName:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName[0]}`
            : "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        countryCode: user.countryCode || "+1",
        profilePicture:
          user.profilePicture || "/placeholder.svg?height=128&width=128",
        profilePictureFile: null,
        universityId: user.universityId || "",
        studentId: user.studentId || "",
        employeeId: user.employeeId || "",
        academicYear: user.academicYear || "",
        department: user.department || "",
        graduationYear: user.graduationYear || "",
        adminPosition: user.adminPosition || "",
      }));
    }
    setHasUnsavedChanges(false);
  };

  const handleUpdatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast("Password mismatch", {
        description: "New password and confirm password do not match.",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast("Password too short", {
        description: "New password must be at least 8 characters long.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        toast("Password updated", {
          description: "Your password has been updated successfully.",
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast("Error", {
        description:
          error instanceof Error ? error.message : "Failed to update password.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
          <div>
            <h2 className="text-lg font-semibold">Failed to load profile</h2>
            <p className="text-muted-foreground">Error</p>
          </div>
          <Button onClick={refreshUser} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Show login redirect if no user
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <User className="h-8 w-8 text-muted-foreground mx-auto" />
          <div>
            <h2 className="text-lg font-semibold">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please log in to access your settings.
            </p>
          </div>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Personal Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Details
          </CardTitle>
          <CardDescription>
            Update your personal information and profile picture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={profileData.profilePicture || "/placeholder.svg"}
                  alt="Profile Picture"
                />
                <AvatarFallback className="text-lg">
                  {profileData.firstName[0] || "U"}
                  {profileData.lastName[0] || ""}
                </AvatarFallback>
              </Avatar>
              <input
                id="profilePictureInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleProfileInputChange(
                      "profilePictureFile",
                      e.target.files[0]
                    );
                  }
                }}
              />
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                onClick={() =>
                  document.getElementById("profilePictureInput")?.click()
                }
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Upload a professional photo. JPG, PNG or GIF. Max size 5MB.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("profilePictureInput")?.click()
                  }
                >
                  Upload New
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleProfileInputChange(
                      "profilePicture",
                      "/placeholder.svg?height=128&width=128"
                    );
                    handleProfileInputChange("profilePictureFile", null);
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) =>
                  handleProfileInputChange("firstName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) =>
                  handleProfileInputChange("lastName", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender (Optional)</Label>
              <Select
                value={profileData.gender}
                onValueChange={(value) =>
                  handleProfileInputChange("gender", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={profileData.displayName}
              onChange={(e) =>
                handleProfileInputChange("displayName", e.target.value)
              }
              placeholder="How others will see your name"
            />
            <p className="text-xs text-muted-foreground">
              This is how your name will appear to other users
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    handleProfileInputChange("email", e.target.value)
                  }
                  readOnly
                />
                <Badge variant="outline" className="shrink-0">
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Select
                  value={profileData.countryCode}
                  onValueChange={(value) =>
                    handleProfileInputChange("countryCode", value)
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    handleProfileInputChange("phone", e.target.value)
                  }
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => handleProfileInputChange("bio", e.target.value)}
              placeholder="Tell others about yourself..."
              rows={4}
              maxLength={500}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {profileData.bio.length}/500 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Expertise Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Skills & Expertise
          </CardTitle>
          <CardDescription>
            Manage your technical skills and proficiency levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {profileData.skills.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{item.skill}</span>
                    {item.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.level} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground">
                      {item.level}%
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit skill</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove skill</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => setIsAddSkillModalOpen(true)}
          >
            Add New Skill
          </Button>
        </CardContent>
      </Card>

      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAddSkill={handleAddSkill}
      />
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      {/* Password & Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Password & Authentication
          </CardTitle>
          <CardDescription>
            Manage your password and authentication methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    handlePasswordInputChange("currentPassword", e.target.value)
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordInputChange("newPassword", e.target.value)
                }
              />
              {passwordData.newPassword && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <span className="text-muted-foreground">
                      {passwordStrength.feedback}
                    </span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center gap-1">
                      {passwordData.newPassword.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-1">
                      {/[A-Z]/.test(passwordData.newPassword) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      Contains uppercase letter
                    </li>
                    <li className="flex items-center gap-1">
                      {/[!@#$%^&*()]/.test(passwordData.newPassword) ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <X className="h-3 w-3 text-red-500" />
                      )}
                      Contains special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={passwordData.confirmNewPassword}
                onChange={(e) =>
                  handlePasswordInputChange(
                    "confirmNewPassword",
                    e.target.value
                  )
                }
              />
              {passwordData.confirmNewPassword && (
                <div className="flex items-center gap-1 text-xs">
                  {passwordData.newPassword ===
                  passwordData.confirmNewPassword ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <X className="h-3 w-3 text-red-500" />
                      <span className="text-red-600">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <Button onClick={handleUpdatePassword} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Enable 2FA</h4>
              <p className="text-sm text-muted-foreground">
                Require a code from your authenticator app to log in.
              </p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Recovery Codes</h4>
            <p className="text-sm text-muted-foreground">
              Use recovery codes to access your account if you lose your device.
            </p>
            <Button variant="outline">Generate New Codes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Active Sessions
          </CardTitle>
          <CardDescription>
            Manage devices logged into your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Current Session (This Device)</h4>
                <p className="text-sm text-muted-foreground">
                  Chrome on Windows, New York, NY
                </p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">Previous Session</h4>
                <p className="text-sm text-muted-foreground">
                  Firefox on macOS, London, UK - 2 days ago
                </p>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
          <Button variant="destructive" className="w-full">
            Log out from all other devices
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Choose what email notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              label: "Team invitations",
              description: "When someone invites you to join their team",
              field: "teamInvitations",
            },
            {
              label: "Project updates",
              description: "Updates about your current projects",
              field: "projectUpdates",
            },
            {
              label: "Assignment deadlines",
              description: "Reminders about upcoming deadlines",
              field: "assignmentDeadlines",
            },
            {
              label: "Weekly digest",
              description: "Summary of your weekly activity",
              field: "weeklyDigest",
            },
            {
              label: "Marketing emails",
              description: "Product updates and feature announcements",
              field: "marketingEmails",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Switch
                checked={
                  profileData.settings.notifications.email[
                    item.field as keyof typeof profileData.settings.notifications.email
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedInputChange(
                    ["settings", "notifications", "email", item.field],
                    checked
                  )
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Manage browser and mobile push notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Browser Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Receive notifications in your browser
              </p>
            </div>
            <Switch
              checked={profileData.settings.notifications.push.browser}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "notifications", "push", "browser"],
                  checked
                )
              }
            />
          </div>
          <div className="space-y-4">
            {[
              { label: "New messages", field: "newMessages" },
              { label: "Team activity", field: "teamActivity" },
              { label: "Project milestones", field: "projectMilestones" },
              { label: "System announcements", field: "systemAnnouncements" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.label}</span>
                <Switch
                  checked={
                    profileData.settings.notifications.push[
                      item.field as keyof typeof profileData.settings.notifications.push
                    ]
                  }
                  onCheckedChange={(checked) =>
                    handleNestedInputChange(
                      ["settings", "notifications", "push", item.field],
                      checked
                    )
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <VolumeX className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
          <CardDescription>
            Set times when you don't want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Enable Quiet Hours</span>
            <Switch
              checked={profileData.settings.notifications.quietHours.enabled}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "notifications", "quietHours", "enabled"],
                  checked
                )
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={profileData.settings.notifications.quietHours.startTime}
                onChange={(e) =>
                  handleNestedInputChange(
                    ["settings", "notifications", "quietHours", "startTime"],
                    e.target.value
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={profileData.settings.notifications.quietHours.endTime}
                onChange={(e) =>
                  handleNestedInputChange(
                    ["settings", "notifications", "quietHours", "endTime"],
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Days</Label>
            <div className="flex flex-wrap gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={profileData.settings.notifications.quietHours.days.includes(
                      day
                    )}
                    onCheckedChange={(checked) => {
                      const currentDays =
                        profileData.settings.notifications.quietHours.days;
                      const newDays = checked
                        ? [...currentDays, day]
                        : currentDays.filter((d) => d !== day);
                      handleNestedInputChange(
                        ["settings", "notifications", "quietHours", "days"],
                        newDays
                      );
                    }}
                  />
                  <Label htmlFor={day} className="text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Profile Visibility
          </CardTitle>
          <CardDescription>
            Control who can see your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Who can see your profile?</Label>
            <Select
              value={profileData.settings.privacy.profileVisibility}
              onValueChange={(value) =>
                handleNestedInputChange(
                  ["settings", "privacy", "profileVisibility"],
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (Everyone)</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="private">Private (Only Me)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Show my email address</h4>
              <p className="text-sm text-muted-foreground">
                Allow others to see your email on your profile.
              </p>
            </div>
            <Switch
              checked={profileData.settings.privacy.showEmail}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "privacy", "showEmail"],
                  checked
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Data Sharing
          </CardTitle>
          <CardDescription>
            Manage how your data is shared with third-party services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Share anonymous usage data</h4>
              <p className="text-sm text-muted-foreground">
                Help us improve by sharing anonymous usage statistics.
              </p>
            </div>
            <Switch
              checked={profileData.settings.privacy.dataSharing}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "privacy", "dataSharing"],
                  checked
                )
              }
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Personalized content</h4>
              <p className="text-sm text-muted-foreground">
                Allow us to use your data to personalize your experience.
              </p>
            </div>
            <Switch
              checked={profileData.settings.privacy.personalizedContent}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "privacy", "personalizedContent"],
                  checked
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Search Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Settings
          </CardTitle>
          <CardDescription>
            Control how your profile appears in search results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Appear in search results</h4>
              <p className="text-sm text-muted-foreground">
                Allow your profile to be discoverable through internal search.
              </p>
            </div>
            <Switch
              checked={profileData.settings.privacy.searchSettings}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "privacy", "searchSettings"],
                  checked
                )
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAcademicSection = () => (
    <div className="space-y-6">
      {/* University Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            University Details
          </CardTitle>
          <CardDescription>
            Your academic information and university details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="universityId">University ID</Label>
              <Input
                id="universityId"
                value={profileData.universityId}
                onChange={(e) =>
                  handleProfileInputChange("universityId", e.target.value)
                }
                placeholder="Enter your university ID"
              />
            </div>
            {user?.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={profileData.studentId}
                  onChange={(e) =>
                    handleProfileInputChange("studentId", e.target.value)
                  }
                  placeholder="Enter your student ID"
                />
              </div>
            )}
            {user?.role === "professor" && (
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  value={profileData.employeeId}
                  onChange={(e) =>
                    handleProfileInputChange("employeeId", e.target.value)
                  }
                  placeholder="Enter your employee ID"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profileData.department}
                onChange={(e) =>
                  handleProfileInputChange("department", e.target.value)
                }
                placeholder="Enter your department"
              />
            </div>
            {user?.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select
                  value={profileData.academicYear}
                  onValueChange={(value) =>
                    handleProfileInputChange("academicYear", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {user?.role === "student" && (
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Expected Graduation Year</Label>
              <Input
                id="graduationYear"
                type="number"
                value={profileData.graduationYear}
                onChange={(e) =>
                  handleProfileInputChange("graduationYear", e.target.value)
                }
                placeholder="e.g., 2025"
                min="2024"
                max="2030"
              />
            </div>
          )}
          {user?.role === "professor" && user?.adminPosition && (
            <div className="space-y-2">
              <Label htmlFor="adminPosition">Administrative Position</Label>
              <Input
                id="adminPosition"
                value={profileData.adminPosition}
                onChange={(e) =>
                  handleProfileInputChange("adminPosition", e.target.value)
                }
                placeholder="e.g., Department Head, Dean"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Academic Status Card */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Status</CardTitle>
          <CardDescription>
            Your current academic standing and allocations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {user?.role === "student" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Team Allocation</span>
                    {user.isTeamAlloted ? (
                      <Badge className="bg-green-100 text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        Allocated
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">
                        <X className="h-3 w-3 mr-1" />
                        Not Allocated
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Project Allocation
                    </span>
                    {user.isProjectAlloted ? (
                      <Badge className="bg-green-100 text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        Allocated
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">
                        <X className="h-3 w-3 mr-1" />
                        Not Allocated
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Team Leadership</span>
                    {user.isTeamAlloted ? (
                      user.isTeamLead ? (
                        <Badge className="bg-blue-100 text-blue-700">
                          <Award className="h-3 w-3 mr-1" />
                          Team Leader
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700">
                          Member
                        </Badge>
                      )
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">
                        <X className="h-3 w-3 mr-1" />
                        Not Applicable
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Academic Status</span>
                    {user.isDetained ? (
                      <Badge className="bg-red-100 text-red-700">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Detained
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Role Information</h4>
                <Badge variant="outline" className="capitalize">
                  {user?.role}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Account Created</h4>
                <p className="text-sm text-muted-foreground">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTeamSection = () => (
    <div className="space-y-6">
      {/* Collaboration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Collaboration Settings
          </CardTitle>
          <CardDescription>
            Manage how you collaborate with your team members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Allow direct messages</h4>
              <p className="text-sm text-muted-foreground">
                Enable or disable direct messaging from team members.
              </p>
            </div>
            <Switch
              checked={profileData.settings.team.allowDirectMessages}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "team", "allowDirectMessages"],
                  checked
                )
              }
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Project access requests</h4>
              <p className="text-sm text-muted-foreground">
                Receive notifications when team members request access to your
                projects.
              </p>
            </div>
            <Switch
              checked={profileData.settings.team.projectAccessRequests}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "team", "projectAccessRequests"],
                  checked
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Team Formation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Formation
          </CardTitle>
          <CardDescription>
            Settings related to joining and creating teams
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">Allow team invitations</h4>
              <p className="text-sm text-muted-foreground">
                Allow other users to invite you to their teams.
              </p>
            </div>
            <Switch
              checked={profileData.settings.team.allowTeamInvitations}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "team", "allowTeamInvitations"],
                  checked
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Default team role for new members</Label>
            <Select
              value={profileData.settings.team.defaultRole}
              onValueChange={(value) =>
                handleNestedInputChange(
                  ["settings", "team", "defaultRole"],
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connected Accounts
          </CardTitle>
          <CardDescription>
            Manage your connected third-party accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <div className="space-y-1">
                <h4 className="font-medium">GitHub</h4>
                <p className="text-sm text-muted-foreground">
                  {profileData.settings.integrations.github.connected
                    ? `Connected as @${profileData.settings.integrations.github.username}`
                    : "Not connected"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {profileData.settings.integrations.github.connected
                ? "Disconnect"
                : "Connect"}
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Chrome className="h-5 w-5" />
              <div className="space-y-1">
                <h4 className="font-medium">Google</h4>
                <p className="text-sm text-muted-foreground">
                  {profileData.settings.integrations.google.connected
                    ? `Connected as ${profileData.settings.integrations.google.email}`
                    : "Not connected"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {profileData.settings.integrations.google.connected
                ? "Disconnect"
                : "Connect"}
            </Button>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Connect New Account
          </Button>
        </CardContent>
      </Card>

      {/* API Access */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            API Access
          </CardTitle>
          <CardDescription>
            Manage API keys and access for your applications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium">API Access</h4>
              <p className="text-sm text-muted-foreground">
                Enable API access for your account
              </p>
            </div>
            <Switch
              checked={profileData.settings.integrations.apiAccess}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "integrations", "apiAccess"],
                  checked
                )
              }
            />
          </div>
          {profileData.settings.integrations.apiAccess && (
            <>
              <div className="space-y-2">
                <Label htmlFor="apiKey">Your API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="text"
                    defaultValue="sk-xxxxxxxxxxxxxxxxxxxx"
                    readOnly
                  />
                  <Button variant="outline">Copy</Button>
                  <Button variant="destructive">Revoke</Button>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Generate New API Key
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>
            Customize the appearance of your interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Theme Mode</Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "light", label: "Light", icon: Sun },
                { id: "dark", label: "Dark", icon: Moon },
                { id: "system", label: "System", icon: Monitor },
              ].map((theme) => (
                <div key={theme.id} className="relative">
                  <input
                    type="radio"
                    id={theme.id}
                    name="theme"
                    className="peer sr-only"
                    checked={profileData.settings.appearance.theme === theme.id}
                    onChange={() =>
                      handleNestedInputChange(
                        ["settings", "appearance", "theme"],
                        theme.id
                      )
                    }
                  />
                  <Label
                    htmlFor={theme.id}
                    className="flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                  >
                    <theme.icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{theme.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <Label>Font Size</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Small</span>
                <span className="text-sm">Large</span>
              </div>
              <Input
                type="range"
                min="12"
                max="20"
                value={profileData.settings.appearance.fontSize}
                onChange={(e) =>
                  handleNestedInputChange(
                    ["settings", "appearance", "fontSize"],
                    Number.parseInt(e.target.value)
                  )
                }
                className="w-full"
              />
              <div className="text-center text-sm text-muted-foreground">
                Current: {profileData.settings.appearance.fontSize}px
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium">High Contrast Mode</h4>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch
              checked={profileData.settings.appearance.highContrast}
              onCheckedChange={(checked) =>
                handleNestedInputChange(
                  ["settings", "appearance", "highContrast"],
                  checked
                )
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Options
          </CardTitle>
          <CardDescription>
            Configure accessibility features for better usability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              label: "Screen Reader Support",
              description: "Optimize interface for screen readers",
              field: "screenReaderSupport",
            },
            {
              label: "Keyboard Navigation",
              description: "Enhanced keyboard navigation support",
              field: "keyboardNavigation",
            },
            {
              label: "Reduce Motion",
              description: "Minimize animations and transitions",
              field: "reduceMotion",
            },
            {
              label: "Focus Indicators",
              description: "Enhanced focus indicators for better visibility",
              field: "focusIndicators",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Switch
                checked={
                  profileData.settings.accessibility[
                    item.field as keyof typeof profileData.settings.accessibility
                  ]
                }
                onCheckedChange={(checked) =>
                  handleNestedInputChange(
                    ["settings", "accessibility", item.field],
                    checked
                  )
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Set your preferred language and regional settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Display Language</Label>
            <Select
              value={profileData.settings.language.displayLanguage}
              onValueChange={(value) =>
                handleNestedInputChange(
                  ["settings", "language", "displayLanguage"],
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Time Zone</Label>
            <Select
              value={profileData.settings.language.timeZone}
              onValueChange={(value) =>
                handleNestedInputChange(
                  ["settings", "language", "timeZone"],
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="cst">Central Time (CST)</SelectItem>
                <SelectItem value="mst">Mountain Time (MST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select
              value={profileData.settings.language.dateFormat}
              onValueChange={(value) =>
                handleNestedInputChange(
                  ["settings", "language", "dateFormat"],
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Download, export, and manage your personal data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Download Personal Data</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Export all your personal information
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="font-medium">Export Project History</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Download your project and team history
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Account Actions
          </CardTitle>
          <CardDescription>Manage your account status and data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">Deactivate Account</h4>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable your account. You can reactivate it
                  anytime.
                </p>
              </div>
              <Button variant="outline">Deactivate</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium text-red-600">Delete Account</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This
                  cannot be undone.
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHelpSection = () => (
    <div className="space-y-6">
      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Documentation
          </CardTitle>
          <CardDescription>
            Find answers to common questions and learn how to use the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="font-medium">Browse Help Articles</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Access our comprehensive knowledge base
            </span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
          >
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="font-medium">Watch Video Tutorials</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Learn visually with our step-by-step guides
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5" />
            Contact Support
          </CardTitle>
          <CardDescription>
            Get in touch with our support team for personalized assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">Chat with Support</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Get real-time help from our agents
            </span>
          </Button>
          <Button
            variant="outline"
            className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
          >
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="font-medium">Email Support</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Send us an email and we'll get back to you
            </span>
          </Button>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Feedback
          </CardTitle>
          <CardDescription>
            Help us improve by sharing your thoughts and suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Share your feedback here..." rows={5} />
          <Button className="w-full">Submit Feedback</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "security":
        return renderSecuritySection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "academic":
        return renderAcademicSection();
      case "team":
        return renderTeamSection();
      case "integrations":
        return renderIntegrationsSection();
      case "appearance":
        return renderAppearanceSection();
      case "data":
        return renderDataSection();
      case "help":
        return renderHelpSection();
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                This section is under development.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/${user?.role}-dashboard`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => router.push(`/${user?.role}-dashboard`)}
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getCurrentSection()?.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {settingsMenu.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                        activeSection === section.id
                          ? "bg-muted border-r-2 border-primary"
                          : ""
                      }`}
                    >
                      <section.icon className="h-4 w-4 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {section.label}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-muted rounded-full h-1">
                            <div
                              className="bg-primary h-1 rounded-full transition-all"
                              style={{ width: `${section.completion}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {section.completion}%
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0" />
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {getCurrentSection()?.label}
                  </h1>
                  <p className="text-muted-foreground">
                    Configure your {getCurrentSection()?.label.toLowerCase()}{" "}
                    settings
                  </p>
                </div>
                {hasUnsavedChanges && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="animate-pulse">
                      Unsaved Changes
                    </Badge>
                    <Button
                      size="sm"
                      onClick={handleSaveChanges}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelChanges}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              {/* Content */}
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
