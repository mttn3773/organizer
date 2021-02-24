"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const mongoose_1 = require("mongoose");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
(() => {
    try {
        const app = express_1.default();
        mongoose_1.connect(config_1.server.mongo.uri, config_1.server.mongo.settings).then(() => {
            console.log(`Connected to DB `);
        });
        app.use(cors_1.default());
        app.use("/api/user", user_routes_1.default);
        app.listen(config_1.server.port, () => {
            console.log(`App is running on port ${config_1.server.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=index.js.map