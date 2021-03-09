"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrors = void 0;
const sendErrors = (res, status = 500, errors, ...props) => {
    if (status < 0 || status > 500)
        status = 500;
    return res
        .status(status)
        .json(Object.assign({ success: false, errors }, props))
        .end();
};
exports.sendErrors = sendErrors;
//# sourceMappingURL=sendError.js.map