import { IUser } from "./../../../src/interfaces/user.interfaces";
import { IError } from "./../interfaces/errors.interface";

export interface IActionState {
  type: string;
  payload?: any;
}

export const setError = (payload: IError[]): IActionState => {
  return {
    type: "SET_ERRORS",
    payload,
  };
};

export const clearError = (): IActionState => {
  return {
    type: "CLEAR_ERRORS",
  };
};

export const setLoading = (payload: boolean): IActionState => {
  return {
    type: "SET_LOADING",
    payload,
  };
};

export const setAuth = (payload: boolean): IActionState => {
  return {
    type: "SET_AUTH",
    payload,
  };
};
