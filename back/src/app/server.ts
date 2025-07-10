import dotenv from "dotenv";
import express, { Express } from "express";

dotenv.config({ path: "/back/src/config/.env.local" });

const app: Express = express();
const PORT = process.env.PORT as string;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
