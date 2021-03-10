import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalState } from "./../store/globalStore";
interface IRequestProps {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
  toastErorrs?: boolean;
}

export const useHttp = () => {
  const { dispatch } = useContext(GlobalState);
  const toast = useToast();
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
      if (!res.success) {
        if (response.status === 401) {
          dispatch({ type: "SET_AUTH", payload: false });
        }
        if (toastErorrs)
          dispatch({
            type: "SET_ERRORS",
            payload: res.errors || [{ msg: "Something went wrong" }],
          });
      }
      if (res.success && res.msg) {
        toast({
          title: "Success",
          description: res.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
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
