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
exports.createTask = exports.getUserTasks = void 0;
const tasks_model_1 = __importDefault(require("../models/tasks.model"));
const getUserTasks = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tasks_model_1.default.find({ owner: req.user._id }).sort({ date: "asc" });
    return res.json({ tasks }).end();
});
exports.getUserTasks = getUserTasks;
const createTask = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, title, description } = req.body;
        const task = new tasks_model_1.default({
            owner: req.user,
            date,
            title,
            description,
        });
        yield task.save();
        return res.json({ msg: "Task created", task }).end();
    }
    catch (error) {
        return res
            .json({
            errors: [{ msg: error.message || "Something went wrong" }],
        })
            .status(500)
            .end();
    }
});
exports.createTask = createTask;
//# sourceMappingURL=task.controller.js.map