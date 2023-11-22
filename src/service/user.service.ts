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
