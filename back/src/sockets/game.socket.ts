import { Namespace, Socket } from "socket.io";

export const gameSocket = (socket: Socket, nsp: Namespace) => {
  socket.on("joinGame", ({ gameId }) => {
    socket.join(gameId);
  });

  socket.on("startGame", ({ gameId }) => {});
};
