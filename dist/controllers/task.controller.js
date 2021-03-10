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
exports.deleteTask = exports.createTask = exports.getUserTasks = void 0;
const tasks_model_1 = __importDefault(require("../models/tasks.model"));
const sendError_1 = require("./../utils/sendError");
const sendOnSuccess_1 = require("./../utils/sendOnSuccess");
const getUserTasks = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tasks_model_1.default.find({ owner: req.user._id }).sort({ date: "asc" });
    return sendOnSuccess_1.sendOnSuccess({ res }, { tasks });
});
exports.getUserTasks = getUserTasks;
const createTask = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, title, description } = req.body;
        console.log(new Date(date).toLocaleString());
        const task = new tasks_model_1.default({
            owner: req.user,
            date,
            title,
            description,
        });
        yield task.save();
        return sendOnSuccess_1.sendOnSuccess({ res, msg: "Task created" }, { task });
    }
    catch (error) {
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.createTask = createTask;
const deleteTask = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = req.task;
        if (!task)
            return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
        yield task.deleteOne();
        return sendOnSuccess_1.sendOnSuccess({ res, msg: "Task deleted" }, { task });
    }
    catch (error) {
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map