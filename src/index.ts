import express from "express";
import cors from "cors";
import { server } from "./config/config";
import { connect } from "mongoose";
import userRouter from "./routes/user.routes";
(() => {
  try {
    const app = express();
    connect(server.mongo.uri!, server.mongo.settings).then(() => {
      console.log(`Connected to DB `);
    });
    app.use(cors());
    app.use("/api/user", userRouter);
    app.listen(server.port, () => {
      console.log(`App is running on port ${server.port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
