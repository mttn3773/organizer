import { ITokenPaylaod } from "./../interfaces/tokenPayload.interface";
import { signAccessToken, signRefreshToken } from "./../utils/signJwt";
import { hash } from "argon2";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { IError } from "./../interfaces/error.interface";
import { ICreateUser, IUser } from "./../interfaces/user.interfaces";
import { verify } from "jsonwebtoken";
import { jwtConfig } from "../config/config";
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
    const refreshToken = signRefreshToken(user!);
    const accessToken = signAccessToken(user!);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/user/token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
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

export const refreshToken = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const token = req.cookies["refreshToken"];
    if (!refreshToken) {
      return res.sendStatus(400);
    }
    verify(token, jwtConfig.refreshTokenSecret!, (err: any, paylaod: any) => {
      if (err) return res.sendStatus(400);
      const accessToken = signAccessToken((paylaod as ITokenPaylaod).user);
      return res.json({ accessToken }).end();
    });
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .status(500)
      .end();
  }
};
