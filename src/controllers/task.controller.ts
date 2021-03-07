import { ICreateTask } from "../interfaces/tasks.interface";
import { Request, Response, NextFunction } from "express";
import Task from "../models/tasks.model";
import { IError } from "src/interfaces/error.interface";

export const getUserTasks = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const tasks = await Task.find({ owner: req.user._id });
  return res.json({ tasks }).end();
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
    return res.json({ msg: "Task created", task }).end();
  } catch (error) {
    return res
      .json({
        errors: [{ msg: error.message || "Something went wrong" }] as IError[],
      })
      .status(500)
      .end();
  }
};
