import { hash } from "argon2";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { IError } from "./../interfaces/error.interface";
import { ICreateUser, IUser } from "./../interfaces/user.interfaces";
import { signAccessToken, signRefreshToken } from "./../utils/signJwt";
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
    const refreshToken = signRefreshToken(user);
    const accessToken = signAccessToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000, // 10m
    });
    return res.json({ msg: "User created" }).end();
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .status(500)
      .end();
  }
};

export const login = async (
  { user }: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const refreshToken = signRefreshToken(user);
    const accessToken = signAccessToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000, // 10m
    });
    return res.json({ refreshToken, accessToken }).end();
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .status(500)
      .end();
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.cookie(
      "refreshToken",
      {},
      {
        httpOnly: true,
        maxAge: -1,
      }
    );
    res.cookie(
      "accessToken",
      {},
      {
        httpOnly: true,
        maxAge: -1,
      }
    );
    return res.json({ msg: "Logged out" }).end();
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .status(500)
      .end();
  }
};
