import authAPI from "./auth";
import IO from "./crud";

export const auth = authAPI;
export const roomApi = new IO("/room");
export const gameApi = new IO("/game");
