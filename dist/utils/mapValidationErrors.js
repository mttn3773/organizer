"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const mapValidationErrors = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(500).send({ errors: errors.array() }).end();
        return;
    }
    next();
};
exports.mapValidationErrors = mapValidationErrors;
//# sourceMappingURL=mapValidationErrors.js.map