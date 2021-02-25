"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapValidationErrors_1 = require("./../utils/mapValidationErrors");
const isUniqueEmailValidator_1 = require("./../utils/isUniqueEmailValidator");
const user_controller_1 = require("./../controllers/user.controller");
const express_1 = require("express");
const user_controller_2 = require("../controllers/user.controller");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.get("", user_controller_2.getAllUsers);
router.post("", [
    express_validator_1.check("email").isEmail().custom(isUniqueEmailValidator_1.isUniqueEmail),
    express_validator_1.check("password").isLength({ min: 6 }),
], mapValidationErrors_1.mapValidationErrors, user_controller_1.register);
exports.default = router;
//# sourceMappingURL=user.routes.js.map