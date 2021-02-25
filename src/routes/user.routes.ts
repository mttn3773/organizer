import { mapValidationErrors } from "./../utils/mapValidationErrors";
import { isUniqueEmail } from "./../utils/isUniqueEmailValidator";
import { register } from "./../controllers/user.controller";
import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { check } from "express-validator";
const router = Router();

router.get("", getAllUsers);

router.post(
  "",
  [
    check("email").isEmail().custom(isUniqueEmail),
    check("password").isLength({ min: 6 }),
  ],
  mapValidationErrors,
  register
);

export default router;
