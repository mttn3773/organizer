import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IError } from "src/interfaces/error.interface";
import User from "../models/user.model";
import { jwtConfig } from "./../config/config";
import { ITokenPaylaod } from "./../interfaces/tokenPayload.interface";
import { signAccessToken } from "./../utils/signJwt";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["accessToken"];
    const refreshToken = req.cookies["refreshToken"];
    if (accessToken) {
      const payload = verify(
        accessToken,
        jwtConfig.accessTokenSecret!
      ) as ITokenPaylaod;
      if (!payload) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Please sign in or register" }] as IError[] })
          .end();
      }
      req.user = payload.user;
      return next();
    }
    if (refreshToken) {
      const payload = verify(
        refreshToken,
        jwtConfig.refreshTokenSecret!
      ) as ITokenPaylaod;
      if (!payload) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Please sign in or register" }] as IError[] })
          .end();
      }
      const user = await User.findById(payload.user._id);
      if (!user) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Please sign in or register" }] as IError[] })
          .end();
      }
      if (payload.user.count !== user.count) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Please sign in or register" }] as IError[] })
          .end();
      }
      const newAccessToken = signAccessToken(user);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000, // 10m
      });
      return next();
    }
    return res
      .status(401)
      .json({ errors: [{ msg: "Please sign in or register" }] as IError[] })
      .end();
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .status(500)
      .end();
  }
};
