import bcrypt from "bcrypt";
import config from "config";
import mongoose from "mongoose";

// TypeScript defination
// export interface UserDocument extends mongoose.Document {
//   email: string;
//   name: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// Type defination for User Input
export interface UserInput {
  email: string;
  name: string;
  password: string;
}

//Type Definatino for user model
export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(loginPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      uniquer: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  loginPassword: string
): Promise<boolean> {
  let user = this as UserDocument;

  return bcrypt.compare(loginPassword, user.password).catch((err) => false);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
