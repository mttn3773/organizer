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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const body_parser_1 = require("body-parser");
const path_1 = __importDefault(require("path"));
(() => {
    try {
        const app = express_1.default();
        mongoose_1.connect(config_1.mongoConfig.uri, config_1.mongoConfig.settings).then(() => {
            console.log(`Connected to DB `);
        });
        app.use(cors_1.default());
        app.use(body_parser_1.json());
        app.use(cookie_parser_1.default());
        app.use(body_parser_1.urlencoded({ extended: false }));
        app.use("/api/user", user_routes_1.default);
        app.use("/api/task", task_routes_1.default);
        if (process.env.NODE_ENV === "production") {
            app.use("/", express_1.default.static(path_1.default.join(__dirname, "..", ".", "web", "build")));
            app.get("*", (_req, res) => {
                res.sendFile(path_1.default.resolve(__dirname, "..", ".", "web", "build", "index.html"));
            });
        }
        app.listen(config_1.server.port, () => {
            console.log(`App is running on port ${config_1.server.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=index.js.map