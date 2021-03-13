import express from "express";
import cors from "cors";
import { server, mongoConfig } from "./config/config";
import { connect } from "mongoose";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.routes";
import { json, urlencoded } from "body-parser";
import path from "path";
(() => {
  try {
    const app = express();
    connect(mongoConfig.uri!, mongoConfig.settings).then(() => {
      console.log(`Connected to DB `);
    });
    app.use(cors());
    app.use(json());
    app.use(cookieParser());
    app.use(urlencoded({ extended: false }));
    app.use("/api/user", userRouter);
    app.use("/api/task", taskRouter);
    if (process.env.NODE_ENV === "production") {
      app.use(
        "/",
        express.static(path.join(__dirname, "..", ".", "web", "build"))
      );
      app.get("*", (_req, res) => {
        res.sendFile(
          path.resolve(__dirname, "..", ".", "web", "build", "index.html")
        );
      });
    }
    app.listen(server.port, () => {
      console.log(`App is running on port ${server.port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
