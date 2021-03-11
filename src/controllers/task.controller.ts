import { NextFunction, Request, Response } from "express";
import { ICreateTask, ITask } from "../interfaces/tasks.interface";
import Task from "../models/tasks.model";
import { sendErrors } from "./../utils/sendError";
import { sendOnSuccess } from "./../utils/sendOnSuccess";

export const getUserTasks = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const tasks = await Task.find({ owner: req.user!._id }).sort({ date: "asc" });
  return sendOnSuccess({ res }, { tasks });
};
export const createTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { date, title, description } = req.body;
    console.log(new Date(date).toLocaleString());

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

export const deleteTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const task = req.task;
    if (!task) return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    await task.deleteOne();
    return sendOnSuccess({ res, msg: "Task deleted" }, { task });
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const task = req.task as ITask;
    if (!task) return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    const { date, title, description } = req.body;

    const newTask = await Task.findOneAndUpdate(
      { _id: task._id },
      { title, date, description },
      { new: true }
    );
    return sendOnSuccess({ res, msg: "Task updated" }, { task: newTask });
  } catch (error) {
    return sendErrors(res, 500, [{ msg: "Something went wrong" }]);
  }
};
