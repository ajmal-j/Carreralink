import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  contact: z
    .number({
      required_error: "Contact is required",
    })
    .refine((contact) => /^[6-9]\d{9}$/.test(String(contact)), {
      message: "Invalid contact number",
    }),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(5, "Username must be at least 5 characters long"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
});

const logInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
});

export { signUpSchema, logInSchema };

export type ISignUpSchema = typeof signUpSchema;
export type ILogInSchema = typeof logInSchema;
