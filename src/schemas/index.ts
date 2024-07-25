import { UserRole } from "@prisma/client";
import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be 2 characters minimum" }),
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(8, {
      message: "Password must be at least 6 characters long",
    })
    .max(100),
});

export const LoginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(8, {
      message: "Password must be at least 6 characters long",
    })
    .max(100),
});

const CreateUser = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 character minimum" }),
  confirmPassword: z.string({ message: "Please provide a password" }),
  role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
});

export const CreateUserSchema = CreateUser.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

const UpdateUser = CreateUser.omit({
  password: true,
  confirmPassword: true,
}).extend({
  password: z
    .string()
    .min(8, { message: "Password must be 8 character minimum" })
    .optional()
    .or(z.literal("")),
  confirmPassword: z.string().optional(),
});

export const UpdateUserSchema = UpdateUser.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);
