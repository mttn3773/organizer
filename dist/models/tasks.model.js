"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });
exports.default = mongoose_1.model("Task", TaskSchema);
//# sourceMappingURL=tasks.model.js.map