import { IError } from "../interfaces/error.interface";
import { Response } from "express";

export const sendErrors = (
  res: Response,
  status: number = 500,
  errors: IError[],
  ...props: any
) => {
  if (status < 0 || status > 500) status = 500;
  return res
    .status(status)
    .json({ success: false, errors, ...props })
    .end();
};
