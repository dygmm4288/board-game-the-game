import { Grid, Text } from "@radix-ui/themes";
import { useRoom } from "../../queries/room";
import RoomCard from "./RoomCard";

export default function RoomList() {
  const { data: rooms, error, isLoading } = useRoom();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>방 정보를 가져오는 동안 에러가 발생했습니다.</Text>;
  if (rooms!.length === 0) return <Text>생성된 방이 없습니다.</Text>;
  return (
    <Grid>
      {rooms!.map((room) => (
        <RoomCard gameId={room.id} slug={room.slug} />
      ))}
    </Grid>
  );
}
