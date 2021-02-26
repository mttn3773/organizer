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
exports.refreshToken = exports.login = exports.register = exports.getAllUsers = void 0;
const signJwt_1 = require("./../utils/signJwt");
const argon2_1 = require("argon2");
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const getAllUsers = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find();
    return res.json({ users }).end();
});
exports.getAllUsers = getAllUsers;
const register = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const hashedPassword = yield argon2_1.hash(password);
        const user = new user_model_1.default({ email, password: hashedPassword });
        yield user.save();
        return res.json({ msg: "User created" }).end();
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
exports.register = register;
const login = ({ user }, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = signJwt_1.signRefreshToken(user);
        const accessToken = signJwt_1.signAccessToken(user);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/api/user/token",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({ refreshToken, accessToken }).end();
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
exports.login = login;
const refreshToken = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies["refreshToken"];
        if (!exports.refreshToken) {
            return res.sendStatus(400);
        }
        jsonwebtoken_1.verify(token, config_1.jwtConfig.refreshTokenSecret, (err, paylaod) => {
            if (err)
                return res.sendStatus(400);
            const accessToken = signJwt_1.signAccessToken(paylaod.user);
            return res.json({ accessToken }).end();
        });
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
exports.refreshToken = refreshToken;
//# sourceMappingURL=user.controller.js.map