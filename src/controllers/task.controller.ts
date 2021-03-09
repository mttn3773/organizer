import { NextFunction, Request, Response } from "express";
import { ICreateTask } from "../interfaces/tasks.interface";
import Task from "../models/tasks.model";
import { sendErrors } from "./../utils/sendError";
import { sendOnSuccess } from "./../utils/sendOnSuccess";

export const getUserTasks = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const tasks = await Task.find({ owner: req.user._id }).sort({ date: "asc" });
  return sendOnSuccess({ res }, { tasks });
};
export const createTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { date, title, description } = req.body;
    const task = new Task({
      owner: req.user,
      date,
      title,
      description,
    } as ICreateTask);
    await task.save();
    return sendOnSuccess({ res, msg: "Task created" }, { task });
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
  }
};
