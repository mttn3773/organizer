import { ITokenPaylaod } from "./../interfaces/tokenPayload.interface";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwtConfig } from "../config/config";
import { IError } from "src/interfaces/error.interface";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.sendStatus(401);
    }
    verify(token, jwtConfig.accessTokenSecret!, (err, paylaod) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = (paylaod as ITokenPaylaod).user;
      return next();
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
