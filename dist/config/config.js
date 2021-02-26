"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.jwtConfig = exports.mongoConfig = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: "./.env" });
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
exports.mongoConfig = {
    uri: MONGO_URI,
    settings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
};
exports.jwtConfig = {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
exports.server = {
    port: PORT,
};
//# sourceMappingURL=config.js.map