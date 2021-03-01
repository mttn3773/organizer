import { IUser } from "../interfaces/user.interfaces";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
