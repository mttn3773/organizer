import { Request, Response, NextFunction } from "express";

export const getAllUsers = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  return res.json({ msg: "Hello" }).end();
};
