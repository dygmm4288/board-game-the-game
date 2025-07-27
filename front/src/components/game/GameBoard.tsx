import { Box, Button, Heading, Text } from "@radix-ui/themes";
import useGame from "../../hooks/useGame";

export default function GameBoard() {
  const { createGame: startGame, game } = useGame();

  const currentPlayer = game?.players?.[game.currentTurn];
  const stackTops = game?.stacks?.map((stack) => {
    const top = stack.cards[stack.cards.length - 1];
    return `${stack.direction}: ${top ?? "비어있음"}`;
  });
  return (
    <Box>
      <Heading>게임 보드</Heading>
      <Button onClick={() => startGame}>게임 시작</Button>

      {game && (
        <Box mt='4'>
          <Text>게임 상태: {game.status}</Text>
          <Text>현재 턴: {currentPlayer?.name ?? "정보 없음"}</Text>
          <Text>남은 카드 수: {game.deck.length}</Text>
          <Text>스택 상태:</Text>
          <Box ml='3'>
            {stackTops?.map((top, idx) => (
              <Text key={idx}>- {top}</Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
