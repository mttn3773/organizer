import { ITask } from "./interfaces/tasks.interface";
import { ITokenPaylaod } from "./interfaces/tokenPayload.interface";
import { IUser } from "./interfaces/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPaylaod["user"];
      task?: ITask;
    }
  }
}
