import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../models/user.model";
import { jwtConfig } from "./../config/config";
import { ITokenPaylaod } from "./../interfaces/tokenPayload.interface";
import { sendErrors } from "./../utils/sendError";
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
      if (!payload.user) {
        return sendErrors(res, 401, [
          { msg: "Please sign in or register", param: "authentication" },
        ]);
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
        return sendErrors(res, 401, [
          { msg: "Please sign in or register", param: "authentication" },
        ]);
      }
      const user = await User.findById(payload.user._id);
      if (!user) {
        return sendErrors(res, 401, [
          { msg: "Please sign in or register", param: "authentication" },
        ]);
      }
      if (payload.user.count !== user.count) {
        return sendErrors(res, 401, [
          { msg: "Please sign in or register", param: "authentication" },
        ]);
      }
      const newAccessToken = signAccessToken(user);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000, // 10m
      });
      req.user = user as any;
      return next();
    }
    return sendErrors(res, 401, [
      { msg: "Please sign in or register", param: "authentication" },
    ]);
  } catch (error) {
    return sendErrors(res, 401, [
      { msg: "Please sign in or register", param: "authentication" },
    ]);
  }
};
