import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const mapValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(500).send({ errors: errors.array() }).end();
    return;
  }
  next();
};
