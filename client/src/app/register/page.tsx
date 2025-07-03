"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/file-upload";
import { ProgressIndicator } from "@/components/progress-indicator";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  User,
  Phone,
  BookOpen,
  Users,
  Crown,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
  type Step4Data,
  type RegistrationData,
  universities,
  departments,
  academicYears,
  checkEmailExists,
  sendVerificationCode,
  verifyCode,
  submitRegistration,
} from "@/lib/registration";
import { toast } from "@/components/ui/sonner";

const stepLabels = ["Account", "Profile", "Role", "Verification"];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [registrationData, setRegistrationData] = useState<
    Partial<RegistrationData>
  >({});

  useEffect(() => {
    const savedData = localStorage.getItem("syncspace_registration_draft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setRegistrationData(parsed.data);
        setCurrentStep(parsed.step);
        setCompletedSteps(parsed.completedSteps);
      } catch (error) {
        console.error("Failed to load saved registration data:", error);
      }
    }
  }, []);

  const saveProgress = (step: number, data: any, completed: number[]) => {
    const progressData = {
      step,
      data: { ...registrationData, ...data },
      completedSteps: completed,
      timestamp: Date.now(),
    };
    localStorage.setItem(
      "syncspace_registration_draft",
      JSON.stringify(progressData)
    );
  };

  // Step 1 Form
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: registrationData as Step1Data,
    mode: "onChange",
  });

  // Step 2 Form
  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: registrationData as Step2Data,
    mode: "onChange",
  });

  // Step 3 Form
  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: registrationData as Step3Data,
    mode: "onChange",
  });

  // Step 4 Form
  const step4Form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: registrationData as Step4Data,
    mode: "onChange",
  });

  const getCurrentForm = () => {
    switch (currentStep) {
      case 1:
        return step1Form;
      case 2:
        return step2Form;
      case 3:
        return step3Form;
      case 4:
        return step4Form;
      default:
        return step1Form;
    }
  };

  const nextStep = async () => {
    const form = getCurrentForm();
    const isValid = await form.trigger();

    if (!isValid) {
      toast("Validation Error", {
        description: "Please fix the errors before continuing.",
      });
      return;
    }

    const formData = form.getValues();
    const newRegistrationData = { ...registrationData, ...formData };
    setRegistrationData(newRegistrationData);

    const newCompletedSteps = [...completedSteps, currentStep];
    setCompletedSteps(newCompletedSteps);

    saveProgress(currentStep + 1, formData, newCompletedSteps);

    if (currentStep === 1) {
      // Check for duplicate email
      setIsLoading(true);
      try {
        const emailExists = await checkEmailExists(
          (formData as Step1Data).email
        );
        if (emailExists) {
          toast("Email Already Exists", {
            description:
              "An account with this email already exists. Please use a different email or sign in.",
          });
          setIsLoading(false);
          return;
        }
      } catch (error) {
        toast("Error", {
          description: "Failed to verify email. Please try again.",
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }

    if (currentStep === 3) {
      // Send verification code
      setIsLoading(true);
      try {
        const result = await sendVerificationCode(newRegistrationData.email!);
        if (result.success) {
          setVerificationSent(true);
          toast("Verification Code Sent", {
            description: result.message,
          });
        }
      } catch (error) {
        toast("Error", {
          description: "Failed to send verification code. Please try again.",
        });
      }
      setIsLoading(false);
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (completedSteps.includes(step - 1) || step === 1) {
      setCurrentStep(step);
    }
  };

  const handleFinalSubmit = async () => {
    const form = getCurrentForm();
    const isValid = await form.trigger();

    if (!isValid) {
      toast("Validation Error", {
        description: "Please complete the verification.",
      });
      return;
    }

    setIsLoading(true);
    const formData = form.getValues();
    const finalData = { ...registrationData, ...formData } as RegistrationData;

    try {
      // Verify code first
      const verificationResult = await verifyCode(
        finalData.email,
        (formData as Step4Data).verificationCode
      );
      if (!verificationResult.success) {
        toast("Verification Failed", {
          description: verificationResult.message,
        });
        setIsLoading(false);
        return;
      }

      const result = await submitRegistration(finalData);
      if (result.success) {
        toast("Registration Successful", {
          description: "Your account has been created successfully!",
        });

        localStorage.removeItem("syncspace_registration_draft");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      toast("Registration Failed", {
        description: "Something went wrong. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const resendVerificationCode = async () => {
    if (resendCountdown > 0) return;

    setIsLoading(true);
    try {
      const result = await sendVerificationCode(registrationData.email!);
      if (result.success) {
        toast("Code Resent", {
          description: "A new verification code has been sent to your email.",
        });
        setResendCountdown(60);
        const timer = setInterval(() => {
          setResendCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      toast("Error", {
        description: "Failed to resend verification code.",
      });
    }
    setIsLoading(false);
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email">University Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email"
            type="email"
            placeholder="your.email@university.edu"
            className="pl-10"
            {...step1Form.register("email")}
          />
        </div>
        {step1Form.formState.errors.email && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step1Form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="universityId">University</Label>
        <Select
          onValueChange={(value) => step1Form.setValue("universityId", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your university" />
          </SelectTrigger>
          <SelectContent>
            {universities.map((uni) => (
              <SelectItem key={uni.id} value={uni.id}>
                {uni.name} ({uni.domain})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {step1Form.formState.errors.universityId && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step1Form.formState.errors.universityId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="pl-10 pr-10"
            {...step1Form.register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {step1Form.formState.errors.password && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step1Form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
            {...step1Form.register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {step1Form.formState.errors.confirmPassword && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step1Form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="termsAccepted"
            checked={step1Form.watch("termsAccepted") || false}
            onCheckedChange={(checked) =>
              step1Form.setValue("termsAccepted", checked === true)
            }
          />
          <Label htmlFor="termsAccepted" className="text-sm">
            I agree to the{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>
          </Label>
        </div>
        {step1Form.formState.errors.termsAccepted && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step1Form.formState.errors.termsAccepted.message}
          </p>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacyAccepted"
            checked={step1Form.watch("privacyAccepted") || false}
            onCheckedChange={(checked) =>
              step1Form.setValue("privacyAccepted", checked === true)
            }
          />
          <Label htmlFor="privacyAccepted" className="text-sm">
            I agree to the{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {step1Form.formState.errors.privacyAccepted && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step1Form.formState.errors.privacyAccepted.message}
          </p>
        )}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="firstName"
              placeholder="John"
              className="pl-10"
              {...step2Form.register("firstName")}
            />
          </div>
          {step2Form.formState.errors.firstName && (
            <p className="text-red-600 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {step2Form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="lastName"
              placeholder="Doe"
              className="pl-10"
              {...step2Form.register("lastName")}
            />
          </div>
          {step2Form.formState.errors.lastName && (
            <p className="text-red-600 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {step2Form.formState.errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Profile Picture (Optional)</Label>
        <FileUpload
          accept="image/*"
          maxSize={2}
          onFileSelect={(files) => {
            if (files.length > 0) {
              step2Form.setValue(
                "profilePicture",
                URL.createObjectURL(files[0])
              );
            }
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="flex space-x-2">
          <Select
            onValueChange={(value) => step2Form.setValue("countryCode", value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="+1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+1">+1</SelectItem>
              <SelectItem value="+44">+44</SelectItem>
              <SelectItem value="+91">+91</SelectItem>
              <SelectItem value="+61">+61</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="phoneNumber"
              placeholder="123-456-7890"
              className="pl-10"
              {...step2Form.register("phoneNumber")}
            />
          </div>
        </div>
        {step2Form.formState.errors.phoneNumber && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step2Form.formState.errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="academicYear">Academic Year</Label>
        <Select
          onValueChange={(value) => step2Form.setValue("academicYear", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your academic year" />
          </SelectTrigger>
          <SelectContent>
            {academicYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {step2Form.formState.errors.academicYear && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step2Form.formState.errors.academicYear.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select
          onValueChange={(value) => step2Form.setValue("department", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {step2Form.formState.errors.department && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step2Form.formState.errors.department.message}
          </p>
        )}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <Label>Select Your Role</Label>
        <div className="grid gap-4">
          {[
            {
              value: "admin",
              icon: Crown,
              title: "University Admin",
              description: "System oversight and project bucket management",
              color: "border-red-200 hover:border-red-300",
            },
            {
              value: "professor",
              icon: BookOpen,
              title: "Professor",
              description: "Project supervision and student evaluation",
              color: "border-blue-200 hover:border-blue-300",
            },
            {
              value: "student",
              icon: Users,
              title: "Student",
              description: "Team participation and project collaboration",
              color: "border-green-200 hover:border-green-300",
            },
          ].map((role) => (
            <Card
              key={role.value}
              className={`cursor-pointer transition-all ${role.color} ${
                step3Form.watch("role") === role.value
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => step3Form.setValue("role", role.value as any)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <role.icon className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-semibold">{role.title}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {step3Form.formState.errors.role && (
          <p className="text-red-600 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {step3Form.formState.errors.role.message}
          </p>
        )}
      </div>

      {/* Role-specific fields */}
      {step3Form.watch("role") === "student" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              placeholder="Enter your student ID"
              {...step3Form.register("studentId")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Expected Graduation Year</Label>
            <Input
              id="graduationYear"
              placeholder="2025"
              {...step3Form.register("graduationYear")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isTeamLead"
              checked={step3Form.watch("isTeamLead") || false}
              onCheckedChange={(checked) =>
                step3Form.setValue("isTeamLead", checked === true)
              }
            />
            <Label htmlFor="isTeamLead">I want to be a Team Lead</Label>
          </div>
        </motion.div>
      )}

      {step3Form.watch("role") === "professor" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input
              id="employeeId"
              placeholder="Enter your employee ID"
              {...step3Form.register("employeeId")}
            />
          </div>
        </motion.div>
      )}

      {step3Form.watch("role") === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="adminPosition">Administrative Position</Label>
            <Input
              id="adminPosition"
              placeholder="e.g., Registrar, Dean, etc."
              {...step3Form.register("adminPosition")}
            />
          </div>
          <div className="space-y-2">
            <Label>Verification Documents</Label>
            <FileUpload
              accept=".pdf,.doc,.docx"
              multiple
              maxSize={5}
              onFileSelect={(files) => {
                const fileNames = files.map((f) => f.name);
                step3Form.setValue("verificationDocuments", fileNames);
              }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6 text-center"
    >
      <div className="space-y-2">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h3 className="text-xl font-semibold">Verify Your Email</h3>
        <p className="text-gray-600">
          We've sent a 6-digit verification code to{" "}
          <span className="font-medium">{registrationData.email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input
            id="verificationCode"
            placeholder="123456"
            className="text-center text-2xl tracking-widest"
            maxLength={6}
            {...step4Form.register("verificationCode")}
          />
          {step4Form.formState.errors.verificationCode && (
            <p className="text-red-600 text-sm flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {step4Form.formState.errors.verificationCode.message}
            </p>
          )}
        </div>

        <div className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={resendVerificationCode}
            disabled={resendCountdown > 0 || isLoading}
            className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
          >
            {resendCountdown > 0
              ? `Resend in ${resendCountdown}s`
              : "Resend Code"}
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                SyncSpace
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your Account
            </h1>
            <p className="text-gray-600">
              Join the university project management platform
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            stepLabels={stepLabels}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />

          {/* Main Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>
                Step {currentStep}: {stepLabels[currentStep - 1]}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 &&
                  "Create your account with university credentials"}
                {currentStep === 2 && "Complete your profile information"}
                {currentStep === 3 &&
                  "Select your role and provide verification details"}
                {currentStep === 4 &&
                  "Verify your email address to complete registration"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Complete Registration
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
