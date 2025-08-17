import { Express } from "express";
import gameRouter from "./game";
import roomRouter from "./room";
import userRouter from "./user";

const registerRoute = (app: Express) => {
  app.use("/auth", userRouter);
  app.use("/game", gameRouter);
  app.use("/room", roomRouter);

  return app;
};
export default registerRoute;
