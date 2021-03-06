import { IRootState } from "./../interfaces/rootState.interface";
import { IActionState } from "./actions";

export const reducers = (
  state: IRootState,
  action: IActionState
): IRootState => {
  switch (action.type) {
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "CLEAR_ERRORS":
      return { ...state, errors: [] };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_AUTH":
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};
