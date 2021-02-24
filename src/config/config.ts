import { config } from "dotenv";

config({ path: "./.env" });

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const mongoConfig = {
  uri: MONGO_URI,
  settings: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
};

export const server = {
  port: PORT,
  mongo: mongoConfig,
};
