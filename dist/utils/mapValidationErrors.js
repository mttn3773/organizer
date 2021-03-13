"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValidationErrors = void 0;
const sendError_1 = require("./sendError");
const express_validator_1 = require("express-validator");
const mapValidationErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return sendError_1.sendErrors(res, 500, errors.array());
    }
    next();
};
exports.mapValidationErrors = mapValidationErrors;
//# sourceMappingURL=mapValidationErrors.js.map