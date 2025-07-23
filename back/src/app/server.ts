import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import path from "path";
import { AppDataSource } from "../config/db";
import userRouter from "../routes/user";

dotenv.config({ path: path.resolve(__dirname, "../config/.env.local") });

const app: Express = express();
const PORT = process.env.PORT as string;
const WEB_ORIGIN = process.env.WEB_ORIGIN as string;

AppDataSource.initialize()
  .then(() => {
    app.use(
      cors({
        origin: WEB_ORIGIN,
      }),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/auth", userRouter);

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during data source initialize", err);
  });
