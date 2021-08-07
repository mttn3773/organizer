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
exports.logout = exports.login = exports.register = exports.me = exports.getAllUsers = void 0;
const sendOnSuccess_1 = require("./../utils/sendOnSuccess");
const argon2_1 = require("argon2");
const user_model_1 = __importDefault(require("../models/user.model"));
const sendError_1 = require("./../utils/sendError");
const signJwt_1 = require("./../utils/signJwt");
const getAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    return res.json({ users }).end();
});
exports.getAllUsers = getAllUsers;
const me = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return sendOnSuccess_1.sendOnSuccess({ res }, { user: req.user });
    }
    catch (error) {
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.me = me;
const register = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const hashedPassword = yield argon2_1.hash(password);
        const user = new user_model_1.default({ email, password: hashedPassword });
        yield user.save((err) => {
            console.log(err);
        });
        const refreshToken = signJwt_1.signRefreshToken(user);
        const accessToken = signJwt_1.signAccessToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
        });
        return sendOnSuccess_1.sendOnSuccess({ res, msg: "User Created" }, { accessToken });
    }
    catch (error) {
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.register = register;
const login = ({ user }, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = signJwt_1.signRefreshToken(user);
        const accessToken = signJwt_1.signAccessToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
        });
        return sendOnSuccess_1.sendOnSuccess({ res, msg: "Logged in succesefully" }, { accessToken });
    }
    catch (error) {
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.login = login;
const logout = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("refreshToken", {}, {
            httpOnly: true,
            maxAge: -1,
        });
        res.cookie("accessToken", {}, {
            httpOnly: true,
            maxAge: -1,
        });
        return sendOnSuccess_1.sendOnSuccess({ res, msg: "Logged out succesefully" });
    }
    catch (error) {
        return sendError_1.sendErrors(res, 500, [{ msg: "Something went wrong" }]);
    }
});
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map