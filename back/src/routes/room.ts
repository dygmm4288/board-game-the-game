import express from "express";
import { authenticate } from "../middlewares/auth.middleware";
import roomController from "../modules/room/room.controller";

const router = express.Router();

router.get("/", authenticate, roomController.getRooms);

export default router;
