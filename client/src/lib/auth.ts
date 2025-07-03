import { z } from "zod"
import api from "./axios"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => {
      const universityDomains = [".edu", ".ac.uk", ".edu.au", ".university.com", "student.university.edu"]
      return universityDomains.some((domain) => email.includes(domain))
    }, "Please use a valid university email address"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
  rememberMe: z.string().optional(),
  universityCode: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Role detection based on email
export const detectUserRole = (email: string): string => {
  if (email.includes("admin") || email.includes("registrar")) {
    return "admin"
  } else if (email.includes("prof") || email.includes("faculty") || email.includes("instructor")) {
    return "professor"
  } else if (email.includes("lead") || email.includes("captain")) {
    return "team_lead"
  } else {
    return "student"
  }
}

export const checkPasswordStrength = (
  password: string,
): {
  score: number
  feedback: string
  color: string
} => {
  let score = 0
  let feedback = ""

  if (password.length >= 8) score += 1
  if (password.match(/[a-z]/)) score += 1
  if (password.match(/[A-Z]/)) score += 1
  if (password.match(/[0-9]/)) score += 1
  if (password.match(/[^a-zA-Z0-9]/)) score += 1

  switch (score) {
    case 0 - 1:
      feedback = "Very Weak"
      return { score, feedback, color: "bg-red-500" }
    case 2:
      feedback = "Weak"
      return { score, feedback, color: "bg-orange-500" }
    case 3:
      feedback = "Fair"
      return { score, feedback, color: "bg-yellow-500" }
    case 4:
      feedback = "Good"
      return { score, feedback, color: "bg-blue-500" }
    case 5:
      feedback = "Strong"
      return { score, feedback, color: "bg-green-500" }
    default:
      return { score, feedback: "Weak", color: "bg-red-500" }
  }
}

interface AuthResponse {
  success: boolean
  user?: {
    id: string
    email: string
    name: string
    role: string
    university: string
  }
  token?: string
  error?: string
}

export const authenticateUser = async (
  data: LoginFormData
): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>(
      "/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )

    return response.data
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
    }
  }
}
