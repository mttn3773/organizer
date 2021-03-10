import { isOwnerMiddleware } from "./../middlewares/isOwnerMiddleware";
import { Router } from "express";
import { check } from "express-validator";
import {
  createTask,
  deleteTask,
  getUserTasks,
} from "./../controllers/task.controller";
import { authMiddleware } from "./../middlewares/authMiddleware";
import { mapValidationErrors } from "./../utils/mapValidationErrors";

const router = Router();

router.get("", authMiddleware, getUserTasks);

router.post(
  "",
  authMiddleware,
  [
    check("date").trim().isISO8601(),
    check("title").isLength({ max: 54, min: 1 }),
    check("description").isLength({ max: 500 }),
  ],
  mapValidationErrors,
  createTask
);

router.delete("/:id", authMiddleware, isOwnerMiddleware, deleteTask);
export default router;
