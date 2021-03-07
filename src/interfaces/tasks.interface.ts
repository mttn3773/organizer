import { Document } from "mongoose";
import { IUser } from "./user.interfaces";

export interface ITask extends Document {
  owner: string;
  date: Date;
  created_at: Date;
  updated_at: Date;
  title: string;
  description?: string;
}

export interface ICreateTask {
  owner: IUser;
  date: Date;
  title: string;
  description?: string;
}
