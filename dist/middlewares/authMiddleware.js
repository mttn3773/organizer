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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = require("./../config/config");
const sendError_1 = require("./../utils/sendError");
const signJwt_1 = require("./../utils/signJwt");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies["accessToken"];
        const refreshToken = req.cookies["refreshToken"];
        if (accessToken) {
            const payload = jsonwebtoken_1.verify(accessToken, config_1.jwtConfig.accessTokenSecret);
            if (!payload.user) {
                return sendError_1.sendErrors(res, 401, [
                    { msg: "Please sign in or register", param: "authentication" },
                ]);
            }
            req.user = payload.user;
            return next();
        }
        if (refreshToken) {
            const payload = jsonwebtoken_1.verify(refreshToken, config_1.jwtConfig.refreshTokenSecret);
            if (!payload) {
                return sendError_1.sendErrors(res, 401, [
                    { msg: "Please sign in or register", param: "authentication" },
                ]);
            }
            const user = yield user_model_1.default.findById(payload.user._id);
            if (!user) {
                return sendError_1.sendErrors(res, 401, [
                    { msg: "Please sign in or register", param: "authentication" },
                ]);
            }
            if (payload.user.count !== user.count) {
                return sendError_1.sendErrors(res, 401, [
                    { msg: "Please sign in or register", param: "authentication" },
                ]);
            }
            const newAccessToken = signJwt_1.signAccessToken(user);
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000,
            });
            req.user = user;
            return next();
        }
        return sendError_1.sendErrors(res, 401, [
            { msg: "Please sign in or register", param: "authentication" },
        ]);
    }
    catch (error) {
        return sendError_1.sendErrors(res, 401, [
            { msg: "Please sign in or register", param: "authentication" },
        ]);
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map