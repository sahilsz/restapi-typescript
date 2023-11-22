import User, { UserInput } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
