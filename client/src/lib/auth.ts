import { z } from "zod";
import api from "./axios";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => {
      const universityDomains = [
        "@cuchd.in",
        ".edu",
        ".ac.uk",
        ".edu.au",
        ".university.com",
        "student.university.edu",
      ];
      return universityDomains.some((domain) => email.includes(domain));
    }, "Please use a valid university email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const verifyResetCodeSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type VerifyResetCodeFormData = z.infer<typeof verifyResetCodeSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const detectUserRole = (email: string): string => {
  if (email.includes("admin") || email.includes("registrar")) {
    return "admin";
  } else if (
    email.includes("prof") ||
    email.includes("faculty") ||
    email.includes("instructor")
  ) {
    return "professor";
  } else if (email.includes("lead") || email.includes("captain")) {
    return "team_lead";
  } else {
    return "student";
  }
};

export const checkPasswordStrength = (
  password: string
): {
  score: number;
  feedback: string;
  color: string;
} => {
  let score = 0;
  let feedback = "";

  if (password.length >= 8) score += 1;
  if (password.match(/[a-z]/)) score += 1;
  if (password.match(/[A-Z]/)) score += 1;
  if (password.match(/[0-9]/)) score += 1;
  if (password.match(/[^a-zA-Z0-9]/)) score += 1;

  switch (score) {
    case 0 - 1:
      feedback = "Very Weak";
      return { score, feedback, color: "bg-red-500" };
    case 2:
      feedback = "Weak";
      return { score, feedback, color: "bg-orange-500" };
    case 3:
      feedback = "Fair";
      return { score, feedback, color: "bg-yellow-500" };
    case 4:
      feedback = "Good";
      return { score, feedback, color: "bg-blue-500" };
    case 5:
      feedback = "Strong";
      return { score, feedback, color: "bg-green-500" };
    default:
      return { score, feedback: "Weak", color: "bg-red-500" };
  }
};

export async function sendPasswordResetEmail(email: string) {
  try {
    const response = await api.post(
      "/auth/forgot-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const result = response.data;
    return result;
  } catch (error) {
    return { success: false, error: "Network error occurred" };
  }
}

export async function verifyPasswordResetCode(email: string, code: string) {
  try {
    const response = await api.post(
      "/auth/verify-reset-code",
      { email, code },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const result = response.data;
    return result;
  } catch (error) {
    return { success: false, error: "Network error occurred" };
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const response = await api.post(
      "/auth/reset-password",
      { token, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const result = response.data;
    return result;
  } catch (error) {
    return { success: false, error: "Network error occurred" };
  }
}
