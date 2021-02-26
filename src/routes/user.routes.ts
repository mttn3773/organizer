import { authMiddleware } from "./../middlewares/authMiddleware";
import { isValidPassword } from "./../utils/isValidPasswordValidator";
import { doesUserWithEmailExists } from "./../utils/doesUserWithEmailExistsValidator";
import { mapValidationErrors } from "./../utils/mapValidationErrors";
import { isUniqueEmail } from "./../utils/isUniqueEmailValidator";
import {
  login,
  refreshToken,
  register,
} from "./../controllers/user.controller";
import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { check } from "express-validator";
const router = Router();

router.get("", authMiddleware, getAllUsers);

router.post(
  "",
  [
    check("email").isEmail().custom(isUniqueEmail),
    check("password").isLength({ min: 6 }),
  ],
  mapValidationErrors,
  register
);

router.post(
  "/login",
  [
    check("email").isEmail().custom(doesUserWithEmailExists),
    check("password").isLength({ min: 6 }).custom(isValidPassword),
  ],
  mapValidationErrors,
  login
);

router.get("/token", refreshToken);

export default router;
