import { CustomValidator } from "express-validator";
import User from "../models/user.model";
export const isUniqueEmail: CustomValidator = async (email: string) => {
  const user = await User.findOne({ email });
  if (user) {
    return Promise.reject("Email already in use");
  }
};
