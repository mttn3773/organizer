"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: "./.env" });
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const mongoConfig = {
    uri: MONGO_URI,
    settings: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
};
exports.server = {
    port: PORT,
    mongo: mongoConfig,
};
//# sourceMappingURL=config.js.map