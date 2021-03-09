import { sendErrors } from "./sendError";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const mapValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendErrors(res, 500, errors.array());
  }
  next();
};
