"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwnerMiddleware = void 0;
const sendError_1 = require("./../utils/sendError");
const tasks_model_1 = __importDefault(require("../models/tasks.model"));
const isOwnerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params["id"];
        if (!id || !req.user)
            return;
        const task = yield tasks_model_1.default.findById(id);
        if (!task)
            return sendError_1.sendErrors(res, 500, [{ msg: "Couldn't find a task" }]);
        if (!(String(task.owner) === String(req.user._id)))
            return sendError_1.sendErrors(res, 403, [{ msg: "You are not authorized" }]);
        req.task = task;
        return next();
    }
    catch (error) {
        console.log(error);
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.isOwnerMiddleware = isOwnerMiddleware;
//# sourceMappingURL=isOwnerMiddleware.js.map