import { CustomValidator } from "express-validator";
import User from "../models/user.model";
export const doesUserWithEmailExists: CustomValidator = async (
  email: string,
  { req }
) => {
  const user = await User.findOne({ email });
  if (!user) {
    return Promise.reject("Couldnt find a user");
  }
  req.user = user;
  return Promise.resolve();
};
