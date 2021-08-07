import { sendOnSuccess } from "./../utils/sendOnSuccess";
import { hash } from "argon2";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { ICreateUser, IUser } from "./../interfaces/user.interfaces";
import { sendErrors } from "./../utils/sendError";
import { signAccessToken, signRefreshToken } from "./../utils/signJwt";
export const getAllUsers = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const users = await User.find();
  return res.json({ users }).end();
};

export const me = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    return sendOnSuccess({ res }, { user: req.user });
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
  }
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
    await user.save((err) => {
      console.log(err);
    });
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
    return sendOnSuccess({ res, msg: "User Created" }, { accessToken });
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
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
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000, // 10m
    });
    return sendOnSuccess(
      { res, msg: "Logged in succesefully" },
      { accessToken }
    );
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
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
    return sendOnSuccess({ res, msg: "Logged out succesefully" });
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
  }
};
