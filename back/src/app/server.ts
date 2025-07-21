import dotenv from "dotenv";
import express, { Express } from "express";
import { AppDataSource } from "../config/db";

dotenv.config({ path: "/back/src/config/.env.local" });

const app: Express = express();
const PORT = process.env.PORT as string;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during data source initialize", err);
  });
