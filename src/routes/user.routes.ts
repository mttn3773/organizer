import { Router } from "express";
import { check } from "express-validator";
import { getAllUsers } from "../controllers/user.controller";
import { login, logout, me, register } from "./../controllers/user.controller";
import { authMiddleware } from "./../middlewares/authMiddleware";
import { doesUserWithEmailExists } from "./../utils/doesUserWithEmailExistsValidator";
import { isUniqueEmail } from "./../utils/isUniqueEmailValidator";
import { isValidPassword } from "./../utils/isValidPasswordValidator";
import { mapValidationErrors } from "./../utils/mapValidationErrors";
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
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);
export default router;
