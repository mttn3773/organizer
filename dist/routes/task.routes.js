"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const task_controller_1 = require("./../controllers/task.controller");
const authMiddleware_1 = require("./../middlewares/authMiddleware");
const mapValidationErrors_1 = require("./../utils/mapValidationErrors");
const router = express_1.Router();
router.get("", authMiddleware_1.authMiddleware, task_controller_1.getUserTasks);
router.post("", authMiddleware_1.authMiddleware, [
    express_validator_1.check("date").trim().isISO8601(),
    express_validator_1.check("title").isLength({ max: 54, min: 1 }),
    express_validator_1.check("description").isLength({ max: 500 }),
], mapValidationErrors_1.mapValidationErrors, task_controller_1.createTask);
exports.default = router;
//# sourceMappingURL=task.routes.js.map