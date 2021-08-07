"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = require("../controllers/user.controller");
const user_controller_2 = require("./../controllers/user.controller");
const authMiddleware_1 = require("./../middlewares/authMiddleware");
const doesUserWithEmailExistsValidator_1 = require("./../utils/doesUserWithEmailExistsValidator");
const isUniqueEmailValidator_1 = require("./../utils/isUniqueEmailValidator");
const isValidPasswordValidator_1 = require("./../utils/isValidPasswordValidator");
const mapValidationErrors_1 = require("./../utils/mapValidationErrors");
const router = express_1.Router();
router.get("", authMiddleware_1.authMiddleware, user_controller_1.getAllUsers);
router.post("", [
    express_validator_1.check("email").isEmail().custom(isUniqueEmailValidator_1.isUniqueEmail),
    express_validator_1.check("password").isLength({ min: 6 }),
], mapValidationErrors_1.mapValidationErrors, user_controller_2.register);
router.post("/login", [
    express_validator_1.check("email").isEmail().custom(doesUserWithEmailExistsValidator_1.doesUserWithEmailExists),
    express_validator_1.check("password").isLength({ min: 6 }).custom(isValidPasswordValidator_1.isValidPassword),
], mapValidationErrors_1.mapValidationErrors, user_controller_2.login);
router.post("/logout", authMiddleware_1.authMiddleware, user_controller_2.logout);
router.get("/me", authMiddleware_1.authMiddleware, user_controller_2.me);
exports.default = router;
//# sourceMappingURL=user.routes.js.map