import { Request } from "express";
import { CustomValidator } from "express-validator";
import { verify } from "argon2";
export const isValidPassword: CustomValidator = async (
  password: string,
  { req }
) => {
  const user = (req as Request).user;
  if (!user) {
    return Promise.reject();
  }
  const isValid = await verify(user.password!, password);
  if (!isValid) {
    return Promise.reject("Wrong Password");
  }
  return Promise.resolve();
};
