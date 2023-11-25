import { object, string } from "zod";

const sessionSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
    password: string({ required_error: "Password is required" }),
  }),
});

// export const SessionSchemaInput = TypeOf<typeof sessionSchema>;

export default sessionSchema;
