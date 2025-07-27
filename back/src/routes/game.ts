import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import gameController from "../modules/game/game.controller";

const router = express.Router();

router.post("/", authenticate, gameController.createGame);

export default router;
