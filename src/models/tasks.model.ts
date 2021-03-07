import { ITask } from "./../interfaces/tasks.interface";
import { model, Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "No description" },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
