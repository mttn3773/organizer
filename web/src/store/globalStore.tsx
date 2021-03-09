import React, { createContext, useEffect, useReducer } from "react";
import { Redirect } from "react-router";
import { config } from "../config/config";
import { useHttp } from "../hooks/useHttp";
import { IRootState } from "../interfaces/rootState.interface";
import { IActionState } from "./actions";
import { reducers } from "./reducers";

interface globalStoreProps {}
const initialState: IRootState = {
  errors: [],
  loading: false,
};
export const GlobalState = createContext<{
  state: IRootState;
  dispatch: React.Dispatch<IActionState>;
}>({ state: initialState, dispatch: () => {} });

export const DataProvider: React.FC<globalStoreProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const { request } = useHttp();
  useEffect(() => {
    if (!(typeof state.auth === "undefined") || !state) return;
    request({ url: config.server.endpoints.me }).then((res) => {
      dispatch({ type: "SET_AUTH", payload: !!res.user });
    });
  }, []);

  return (
    <GlobalState.Provider value={{ state, dispatch }}>
      {children}
    </GlobalState.Provider>
  );
};
