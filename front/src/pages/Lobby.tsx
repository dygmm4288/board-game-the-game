import { Badge, Button, Flex, Text } from "@radix-ui/themes";
import RoomList from "../components/lobby/RoomList";
import { useRoom } from "../queries/room";

export default function Lobby() {
  const { data: rooms } = useRoom();

  return (
    <section>
      <h1>Lobby Page</h1>
      <Button>방 만들기</Button>
      <Button>코드로 참여</Button>

      <Flex align='center' gap='2' mb='2'>
        <Text size='2' color='gray'>
          공개 방
        </Text>
        <Badge color='indigo'>{rooms ? rooms.length : 0}</Badge>
        <RoomList />
      </Flex>
    </section>
  );
}
