import { IUser } from "./../interfaces/user.interfaces";
import { jwtConfig } from "../config/config";
import { sign } from "jsonwebtoken";
export const signAccessToken = (user: IUser): string => {
  user.password = undefined;
  const accessToken = sign({ user }, jwtConfig.accessTokenSecret!, {
    expiresIn: "10m",
  });
  return accessToken;
};

export const signRefreshToken = (user: IUser): string => {
  user.password = undefined;
  const refreshToken = sign({ user }, jwtConfig.refreshTokenSecret!, {
    expiresIn: "7d",
  });
  return refreshToken;
};
