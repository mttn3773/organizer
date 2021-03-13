"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    password: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map