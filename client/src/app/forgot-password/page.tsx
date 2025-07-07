"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/sonner"
import {
  GraduationCap,
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  forgotPasswordSchema,
  verifyResetCodeSchema,
  resetPasswordSchema,
  type ForgotPasswordFormData,
  type VerifyResetCodeFormData,
  type ResetPasswordFormData,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  resetPassword,
  checkPasswordStrength,
} from "@/lib/auth"
import { useRouter } from "next/navigation"

type Step = "email" | "verification" | "reset" | "success"

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState<Step>("email")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: "",
    color: "",
  })
  const [resendCooldown, setResendCooldown] = useState(0)

  const router = useRouter()

  // Email form
  const emailForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  })

  // Verification form
  const verificationForm = useForm<VerifyResetCodeFormData>({
    resolver: zodResolver(verifyResetCodeSchema),
    mode: "onChange",
  })

  // Reset password form
  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  })

  const watchedPassword = resetForm.watch("password", "")

  useEffect(() => {
    if (watchedPassword) {
      setPasswordStrength(checkPasswordStrength(watchedPassword))
    }
  }, [watchedPassword])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleEmailSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      const result = await sendPasswordResetEmail(data.email)
      if (result.success) {
        setEmail(data.email)
        setCurrentStep("verification")
        setResendCooldown(60)
        toast.success("Reset code sent to your email!")
      } else {
        toast.error(result.error || "Failed to send reset email")
      }
    } catch (error) {
      toast.error("Unable to connect to the server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (data: VerifyResetCodeFormData) => {
    setIsLoading(true)
    try {
      const result = await verifyPasswordResetCode(email, data.code)
      if (result.success && result.token) {
        setResetToken(result.token)
        setCurrentStep("reset")
        toast.success("Code verified successfully!")
      } else {
        verificationForm.setError("code", {
          type: "manual",
          message: result.error || "Invalid verification code",
        })
        toast.error(result.error || "Invalid verification code")
      }
    } catch (error) {
      toast.error("Unable to verify code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    try {
      const result = await resetPassword(resetToken, data.password)
      if (result.success) {
        setCurrentStep("success")
        toast.success("Password reset successfully!")
      } else {
        resetForm.setError("root", {
          type: "manual",
          message: result.error || "Failed to reset password",
        })
        toast.error(result.error || "Failed to reset password")
      }
    } catch (error) {
      toast.error("Unable to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0) return

    setIsLoading(true)
    try {
      const result = await sendPasswordResetEmail(email)
      if (result.success) {
        setResendCooldown(60)
        toast.success("New reset code sent!")
      } else {
        toast.error("Failed to resend code")
      }
    } catch (error) {
      toast.error("Unable to resend code")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "email":
        return (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password?</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Enter your university email and we'll send you a reset code
              </CardDescription>
            </div>

            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  University Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    className={`pl-10 ${
                      emailForm.formState.errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    {...emailForm.register("email")}
                  />
                </div>
                {emailForm.formState.errors.email && (
                  <motion.div
                    className="flex items-center space-x-1 text-red-600 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{emailForm.formState.errors.email.message}</span>
                  </motion.div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Reset Code...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          </motion.div>
        )

      case "verification":
        return (
          <motion.div
            key="verification"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Check Your Email</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                We sent a 6-digit code to <strong>{email}</strong>
              </CardDescription>
            </div>

            <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                  Verification Code
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    className={`pl-10 text-center text-lg tracking-widest ${
                      verificationForm.formState.errors.code
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    maxLength={6}
                    {...verificationForm.register("code")}
                  />
                </div>
                {verificationForm.formState.errors.code && (
                  <motion.div
                    className="flex items-center space-x-1 text-red-600 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{verificationForm.formState.errors.code.message}</span>
                  </motion.div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600">Didn't receive the code? </span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0 || isLoading}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors disabled:text-gray-400"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
                </button>
              </div>
            </form>
          </motion.div>
        )

      case "reset":
        return (
          <motion.div
            key="reset"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Set New Password</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Choose a strong password for your account
              </CardDescription>
            </div>

            <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className={`pl-10 pr-10 ${
                      resetForm.formState.errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    {...resetForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {watchedPassword && (
                  <motion.div className="space-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{
                            width: `${(passwordStrength.score / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{passwordStrength.feedback}</span>
                    </div>
                  </motion.div>
                )}

                {resetForm.formState.errors.password && (
                  <motion.div
                    className="flex items-center space-x-1 text-red-600 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{resetForm.formState.errors.password.message}</span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className={`pl-10 pr-10 ${
                      resetForm.formState.errors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    {...resetForm.register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {resetForm.formState.errors.confirmPassword && (
                  <motion.div
                    className="flex items-center space-x-1 text-red-600 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{resetForm.formState.errors.confirmPassword.message}</span>
                  </motion.div>
                )}
              </div>

              {resetForm.formState.errors.root && (
                <motion.div
                  className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{resetForm.formState.errors.root.message}</span>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </motion.div>
        )

      case "success":
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle className="w-8 h-8 text-green-600" />
            </motion.div>

            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Password Reset Successfully!</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Your password has been updated. You can now sign in with your new password.
              </CardDescription>
            </div>

            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg"
            >
              Back to Sign In
            </Button>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Link href="/login" className="absolute top-4 left-4 px-4 py-2">
        <Button variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>
      </Link>

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
              <span className="text-2xl font-bold text-gray-900">SyncSpace</span>
            </motion.div>

            {/* Progress indicator */}
            {currentStep !== "success" && (
              <div className="flex items-center justify-center space-x-2 mb-4">
                {["email", "verification", "reset"].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        currentStep === step
                          ? "bg-blue-600 text-white"
                          : ["email", "verification", "reset"].indexOf(currentStep) > index
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {["email", "verification", "reset"].indexOf(currentStep) > index ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < 2 && (
                      <div
                        className={`w-8 h-0.5 ${
                          ["email", "verification", "reset"].indexOf(currentStep) > index
                            ? "bg-green-600"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
