import { useState } from "react";
import { gameApi } from "../api/services";
import Game from "../models/game";

export default function useGame() {
  const [game, setGame] = useState<Game | null>(null);

  const createGame = () => {
    gameApi
      .post()
      .then((res) => Game.create(res.data.game) as Game)
      .then((res) => {
        console.log(res);
        setGame(res);
      });
  };

  const playGame = () => {
    gameApi
      .post({})
      .then((res) => Game.create(res.data) as Game)
      .then((res) => setGame(res));
  };

  return {
    createGame,
    playGame,
    game,
  };
}
