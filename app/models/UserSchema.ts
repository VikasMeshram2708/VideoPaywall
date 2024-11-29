import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must have at-least 2 characters",
    })
    .max(50, {
      message: "Name shouldn't exceed more than 50 characters",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Name must have at-least 5 characters",
    })
    .max(50, {
      message: "Name shouldn't exceed more than 50 characters",
    }),
  avatar_url: z.string().optional().nullable().or(z.literal("")),
});

export type signUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Name must have at-least 5 characters",
    })
    .max(50, {
      message: "Name shouldn't exceed more than 50 characters",
    }),
});

export type loginSchema = z.infer<typeof loginSchema>;
