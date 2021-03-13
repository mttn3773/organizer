"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOnSuccess = void 0;
const sendOnSuccess = ({ res, msg }, props) => {
    return res.json(Object.assign({ success: true, msg }, props)).end();
};
exports.sendOnSuccess = sendOnSuccess;
//# sourceMappingURL=sendOnSuccess.js.map