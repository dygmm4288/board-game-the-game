import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { gameSocket } from "./game.socket";

export const initSockets = (httpServer: HttpServer) => {
  const io = new Server(httpServer);
  io.of("/game").on("connection", (socket) =>
    gameSocket(socket, io.of("/game")),
  );
};
