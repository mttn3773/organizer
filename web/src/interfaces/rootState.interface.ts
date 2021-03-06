import { IError } from "./errors.interface";
import { IUser } from "./user.interface";
export interface IRootState {
  errors: IError[];
  loading: boolean;
  auth?: IUser;
}
