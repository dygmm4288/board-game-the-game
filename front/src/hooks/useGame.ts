import { useState } from "react";
import gameApi from "../api/game";
import Game from "../models/game";

export default function useGame() {
  const [game, setGame] = useState<Game | null>(null);

  const startGame = () => {
    gameApi
      .post({})
      .then((res) => Game.create(res.data) as Game)
      .then((res) => setGame(res));
  };

  const playGame = () => {
    gameApi
      .post({})
      .then((res) => Game.create(res.data) as Game)
      .then((res) => setGame(res));
  };

  return {
    startGame,
    playGame,
    game,
  };
}
