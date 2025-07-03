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
import { toast } from "@/components/ui/sonner";
import { Captcha } from "@/components/captcha";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  Chrome,
  Building,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  loginSchema,
  type LoginFormData,
  authenticateUser,
  checkPasswordStrength,
} from "@/lib/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "",
  });
  const [showFirstTimeFields, setShowFirstTimeFields] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const watchedPassword = watch("password", "");
  const watchedEmail = watch("email", "");

  useEffect(() => {
    if (watchedPassword) {
      setPasswordStrength(checkPasswordStrength(watchedPassword));
    }
  }, [watchedPassword]);

  // useEffect(() => {
  //   if (failedAttempts >= 3) {
  //     setShowCaptcha(false);
  //   }
  // }, [failedAttempts]);

  const onSubmit = async (data: LoginFormData) => {
    alert("Submitting login data...");
    if (showCaptcha && !captchaVerified) {
      toast.error("Please complete the security verification.");
      return;
    }

    setIsLoading(true);
    clearErrors();

    try {
      const result = await authenticateUser(data);

      if (result.success && result.user) {
        toast.success(`Welcome back, ${result.user.name}!`);

        if (data.rememberMe) {
          localStorage.setItem("syncspace_token", result.token!);
        } else {
          sessionStorage.setItem("syncspace_token", result.token!);
        }

        setTimeout(() => {
          switch (result.user?.role) {
            case "admin":
              window.location.href = "/admin/dashboard";
              break;
            case "professor":
              window.location.href = "/professor/dashboard";
              break;
            case "team_lead":
              window.location.href = "/team-lead/dashboard";
              break;
            default:
              window.location.href = "/student/dashboard";
          }
        }, 1500);
      } else {
        setFailedAttempts((prev) => prev + 1);
        setError("root", {
          type: "manual",
          message: result.error || "Authentication failed",
        });
        toast.error(result.error || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`Social Login`, {
      description: `${provider} login will be available soon.`,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <motion.div
                className="flex items-center justify-center space-x-2 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  SyncSpace
                </span>
              </motion.div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to your university project management account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    University Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@university.edu"
                      className={`pl-10 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <motion.div
                      className="flex items-center space-x-1 text-red-600 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email.message}</span>
                    </motion.div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      {...register("password")}
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

                  {/* Password Strength Indicator */}
                  {watchedPassword && (
                    <motion.div
                      className="space-y-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {passwordStrength.feedback}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {errors.password && (
                    <motion.div
                      className="flex items-center space-x-1 text-red-600 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password.message}</span>
                    </motion.div>
                  )}
                </div>

                {/* University Code (First-time users) */}
                {showFirstTimeFields && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Label
                      htmlFor="universityCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      University Code (Optional)
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="universityCode"
                        type="text"
                        placeholder="Enter your university code"
                        className="pl-10"
                        {...register("universityCode")}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Captcha */}
                <Captcha show={showCaptcha} onVerify={setCaptchaVerified} />

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rememberMe" {...register("rememberMe")} />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Error Message */}
                {errors.root && (
                  <motion.div
                    className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.root.message}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg"
                  disabled={isLoading || (showCaptcha && !captchaVerified)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Google")}
                  className="w-full"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSocialLogin("Microsoft")}
                  className="w-full"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Microsoft
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-sm text-gray-600">First time here? </span>
                <Link
                  href="/register"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Create Account
                </Link>
              </div>

              {/* First Time Toggle */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowFirstTimeFields(!showFirstTimeFields)}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showFirstTimeFields ? "Hide" : "Show"} first-time user
                  options
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          {/* <motion.div
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Demo Credentials:
            </h4>
            <div className="text-xs text-blue-700 space-y-1">
              <div>Admin: admin@university.edu / password123</div>
              <div>Professor: prof.smith@university.edu / password123</div>
              <div>Student: student@university.edu / password123</div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </>
  );
}
