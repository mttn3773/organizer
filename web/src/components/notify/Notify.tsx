import { useToast } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect } from "react";
import { GlobalState } from "../../store/globalStore";
import { Loading } from "./Loading";

interface NotifyProps {}

export const Notify: React.FC<NotifyProps> = () => {
  const { state, dispatch } = useContext(GlobalState);
  const { errors, loading } = state;
  const toast = useToast();
  useEffect(() => {
    if (!errors || !errors.length) return;
    if (errors.length)
      errors.map((error) => {
        return toast({
          title: "Error",
          description: error.msg || "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    else {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    dispatch({ type: "CLEAR_ERRORS" });
  }, [errors]);
  return <>{loading && <Loading />}</>;
};
