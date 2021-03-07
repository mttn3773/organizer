import express from "express";
import cors from "cors";
import { server, mongoConfig } from "./config/config";
import { connect } from "mongoose";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.routes";
import { json, urlencoded } from "body-parser";
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
    app.listen(server.port, () => {
      console.log(`App is running on port ${server.port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
