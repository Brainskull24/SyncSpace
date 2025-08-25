import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Progress } from "@radix-ui/react-progress";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Separator } from "@radix-ui/react-separator";
import {
  User,
  Camera,
  Badge,
  Check,
  Star,
  Award,
  Edit,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Button, Select } from "react-day-picker";
import { Label } from "recharts";
import { AddSkillModal } from "../add-skill-modal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function renderProfileSection() {
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

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
  return (
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
}
