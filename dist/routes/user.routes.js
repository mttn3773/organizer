"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.Router();
router.get("", user_controller_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=user.routes.js.map