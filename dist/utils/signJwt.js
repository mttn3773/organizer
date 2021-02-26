"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const config_1 = require("../config/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const signAccessToken = (user) => {
    user.password = undefined;
    const accessToken = jsonwebtoken_1.sign({ user }, config_1.jwtConfig.accessTokenSecret, {
        expiresIn: "10m",
    });
    return accessToken;
};
exports.signAccessToken = signAccessToken;
const signRefreshToken = (user) => {
    user.password = undefined;
    const refreshToken = jsonwebtoken_1.sign({ user }, config_1.jwtConfig.refreshTokenSecret, {
        expiresIn: "7d",
    });
    return refreshToken;
};
exports.signRefreshToken = signRefreshToken;
//# sourceMappingURL=signJwt.js.map