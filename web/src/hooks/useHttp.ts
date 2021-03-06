import { json } from "body-parser";
import { GlobalState } from "./../store/globalStore";
import { useContext, useEffect } from "react";
interface IRequestProps {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
  toastErorrs?: boolean;
}

export const useHttp = () => {
  const { dispatch, state } = useContext(GlobalState);

  const request = async ({
    url,
    method = "GET",
    body,
    headers = {},
    toastErorrs = true,
  }: IRequestProps) => {
    try {
      headers["Accept"] = "application/json, text/plain, */*";
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
      dispatch({ type: "SET_LOADING", payload: true });
      const response: any = await fetch(url, { method, body, headers });
      const res = await response.json();
      if (!response.ok || res.errors) {
        if (toastErorrs)
          dispatch({
            type: "SET_ERRORS",
            payload: res.errors || [{ msg: "Something went wrong" }],
          });
      }
      dispatch({ type: "SET_LOADING", payload: false });
      return res;
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      if (toastErorrs) dispatch({ type: "SET_ERRORS", payload: [error] });
      return;
    }
  };

  return { request };
};
