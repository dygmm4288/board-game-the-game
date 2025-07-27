import { Box, Button, Heading, Text } from "@radix-ui/themes";
import useGame from "../../hooks/useGame";

export default function GameBoard() {
  const { createGame: startGame, game } = useGame();

  const currentPlayer = game?.players?.[game.currentTurn];
  return (
    <Box>
      <Heading>게임 보드</Heading>
      <Button onClick={() => startGame()}>게임 시작</Button>

      {game && (
        <Box mt='4'>
          <Text>게임 상태: {game.status}</Text>
          <Text>현재 턴: {currentPlayer?.name ?? "정보 없음"}</Text>
          <Text>남은 카드 수: {game.deck?.length}</Text>
          <Text>스택 상태: {JSON.stringify(game.stacks || "")}</Text>
        </Box>
      )}
    </Box>
  );
}
