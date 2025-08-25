import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const verifyResetCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6),
});
