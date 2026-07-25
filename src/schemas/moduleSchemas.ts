import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  plan: z.string().min(1, "Select a plan"),
});
export type MemberFormValues = z.infer<typeof memberSchema>;

export const planSchema = z.object({
  name: z.string().min(2, "Plan name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  duration: z.enum(["Monthly", "Quarterly", "Annual"]),
  features: z.string().min(2, "List at least one feature"),
});
export type PlanFormValues = z.infer<typeof planSchema>;

export const trainerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(2, "Specialty is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  experience: z.string().min(1, "Experience is required"),
});
export type TrainerFormValues = z.infer<typeof trainerSchema>;

export const classSchema = z.object({
  name: z.string().min(2, "Class name is required"),
  trainer: z.string().min(1, "Select a trainer"),
  day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  capacity: z.coerce.number().int().positive("Capacity must be greater than 0"),
  category: z.enum(["Yoga", "HIIT", "Strength", "Cardio", "Cycling", "Pilates"]),
  location: z.string().min(1, "Location is required"),
});
export type ClassFormValues = z.infer<typeof classSchema>;

export const paymentSchema = z.object({
  memberName: z.string().min(2, "Select or enter a member name"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  method: z.enum(["card", "cash", "bank", "upi"]),
  plan: z.string().min(1, "Select a plan"),
});
export type PaymentFormValues = z.infer<typeof paymentSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  bio: z.string().max(240, "Keep your bio under 240 characters").optional(),
});
export type ProfileFormValues = z.infer<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Enter your current password"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type PasswordFormValues = z.infer<typeof passwordSchema>;

export const gymProfileSchema = z.object({
  gymName: z.string().min(2, "Gym name is required"),
  address: z.string().min(2, "Address is required"),
  phone: z.string().min(7, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  timezone: z.string().min(1, "Select a timezone"),
});
export type GymProfileFormValues = z.infer<typeof gymProfileSchema>;
