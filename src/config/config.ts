import { config } from "dotenv";

config({ path: "./.env" });

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

export const mongoConfig = {
  uri: MONGO_URI,
  settings: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

export const jwtConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};

export const server = {
  port: PORT,
};
