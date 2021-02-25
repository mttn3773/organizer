import { IError } from "./../interfaces/error.interface";
import { ICreateUser, IUser } from "./../interfaces/user.interfaces";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { hash } from "argon2";
export const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const users = await User.find();
  return res.json({ users }).end();
};

export const register = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { email, password } = req.body as ICreateUser;
    const hashedPassword = await hash(password);
    const user = new User({ email, password: hashedPassword } as IUser);
    await user.save();
    return res.json({ msg: "User created" }).end();
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .end();
  }
};
