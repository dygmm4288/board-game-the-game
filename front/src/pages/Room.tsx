import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Link, useLocation, useParams } from "react-router-dom";
import type { Room } from "../types/room.type";

export default function Room() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const room = location.state?.room as Room | undefined;

  const handleGameStart = () => {
    // TODO: socket 연결? api 해결? 결정해야함.
  };

  if (!room) {
    return (
      <Box>
        <Heading>방 정보</Heading>
        <Text>방 ID: {id}</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading>{room.slug || room.id}</Heading>
      <Text>정원: {room.capacity}명</Text>
      <Text>생성일: {new Date(room.createdAt).toLocaleString()}</Text>
      <Box>
        <Flex direction='row'>
          <Button onClick={handleGameStart}>게임 시작</Button>
        </Flex>
      </Box>
      <Box mt='2'>
        <Link to='/lobby'>로비로</Link>
      </Box>
    </Box>
  );
}
