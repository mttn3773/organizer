import { Response } from "express";

interface ISendOnSuccessOptions {
  res: Response;
  msg?: string;
}

export const sendOnSuccess = (
  { res, msg }: ISendOnSuccessOptions,
  props?: Object
) => {
  return res.json({ success: true, msg, ...props }).end();
};
