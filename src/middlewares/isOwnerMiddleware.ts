import { sendErrors } from "./../utils/sendError";
import { Request, Response, NextFunction } from "express";
import Task from "../models/tasks.model";
export const isOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params["id"];
    if (!id || !req.user) return;
    const task = await Task.findById(id);
    if (!task) return sendErrors(res, 500, [{ msg: "Couldn't find a task" }]);
    if (!(String(task.owner) === String(req.user._id)))
      return sendErrors(res, 403, [{ msg: "You are not authorized" }]);
    req.task = task;
    return next();
  } catch (error) {
    console.log(error);

    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
  }
};
