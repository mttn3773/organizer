import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}
