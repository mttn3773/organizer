import { IUser } from "./../interfaces/user.interface";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
