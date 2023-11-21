import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Passowrd too short - should be 6 chars minimum"),
    confirmPassword: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
