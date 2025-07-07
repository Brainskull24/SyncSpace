import { z } from "zod";
import api from "./axios";

export const universities = [
  {
    id: "1",
    name: "University of Technology",
    domain: "university.edu",
    country: "US",
  },
  { id: "2", name: "Cambridge University", domain: "cam.ac.uk", country: "UK" },
  { id: "3", name: "MIT", domain: "mit.edu", country: "US" },
  {
    id: "4",
    name: "Stanford University",
    domain: "stanford.edu",
    country: "US",
  },
  { id: "5", name: "Oxford University", domain: "ox.ac.uk", country: "UK" },
];

export const departments = [
  "Computer Science",
  "Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Business Administration",
  "Economics",
  "Psychology",
  "Literature",
];

export const academicYears = [
  "Not Applicable (Professor/Admin)",
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Graduate",
  "PhD",
  "Post-Doc",
];

export const step1Schema = z
  .object({
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
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    universityId: z.string().min(1, "Please select your university"),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms of service"),
    privacyAccepted: z
      .boolean()
      .refine((val) => val === true, "You must accept the privacy policy"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const step2Schema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  profilePicture: z.string().optional(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, {
      message:
        "Phone number must be exactly 10 digits and contain only numbers",
    }),

  countryCode: z.string().min(1, "Country code is required"),
  academicYear: z.string().min(1, "Please select your academic year"),
  department: z.string().min(1, "Please select your department"),
});

export const step3Schema = z
  .object({
    role: z.enum(["admin", "professor", "student"], {
      required_error: "Please select your role",
    }),
    studentId: z.string().optional(),
    employeeId: z.string().optional(),
    graduationYear: z.string().optional(),
    adminPosition: z.string().optional(),
    verificationDocuments: z.array(z.string()).optional(),
    isTeamLead: z.boolean().default(false).optional(),
  })
  .refine(
    (data) => {
      if (data.role === "student" && !data.studentId) {
        return false;
      }
      if (data.role === "professor" && !data.employeeId) {
        return false;
      }
      if (data.role === "admin" && !data.adminPosition) {
        return false;
      }
      return true;
    },
    {
      message: "Please fill in all required fields for your selected role",
      path: ["role"],
    }
  );

export const step4Schema = z.object({
  verificationCode: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits"),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;
export type Step4Data = z.infer<typeof step4Schema>;

export type RegistrationData = Step1Data & Step2Data & Step3Data & Step4Data;

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const res = await api.post("/auth/check-email", { email });
  return res.data.exists;
};

export const sendVerificationCode = async (
  email: string,
  name: string
): Promise<{ success: boolean; message: string }> => {
  const res = await api.post("/auth/send-code", { email, name });
  return res.data;
};

export const verifyCode = async (
  email: string,
  code: string
): Promise<{ success: boolean; message: string }> => {
  const res = await api.post("/auth/verify-code", { email, code });
  return res.data;
};

export const submitRegistration = async (
  data: RegistrationData
): Promise<{ success: boolean; message: string }> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
