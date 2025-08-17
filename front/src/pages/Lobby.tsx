import { Badge, Flex, Text } from "@radix-ui/themes";
import RoomBtns from "../components/lobby/RoomBtns";
import RoomList from "../components/lobby/RoomList";
import { useRoom } from "../queries/room";

export default function Lobby() {
  const { data: rooms } = useRoom();

  return (
    <section>
      <h1>Lobby Page</h1>
      <RoomBtns />

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
