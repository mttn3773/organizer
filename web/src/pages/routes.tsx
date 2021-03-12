import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GlobalState } from "../store/globalStore";
import { LoginPage } from "./Login";
import { ProfilePage } from "./Profile";
import { RegisterPage } from "./register";
interface routesProps {}

export const Routes: React.FC<routesProps> = ({}) => {
  const { state } = useContext(GlobalState);
  const { auth } = state;

  const isUndefined = typeof auth === "undefined";
  if (isUndefined) {
    return null;
  }
  return (
    <BrowserRouter>
      {auth ? (
        <Switch>
          <Route component={ProfilePage} path="/profile" />
          <Redirect to="/profile" />
        </Switch>
      ) : (
        <Switch>
          <Route component={RegisterPage} path="/register" />
          <Route component={LoginPage} path="/login" />
          <Redirect to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
};
