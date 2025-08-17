import { Grid, Text } from "@radix-ui/themes";
import { useEffect } from "react";
import useRoom from "../../hooks/useRoom";
import RoomCard from "./RoomCard";

export default function RoomList() {
  const { rooms, fetchRoom } = useRoom();

  useEffect(() => {
    fetchRoom();
  }, []);

  if (rooms.length === 0) return <Text>생성된 방이 없습니다.</Text>;
  return (
    <Grid>
      {rooms.map((room) => (
        <RoomCard gameId={room.id} />
      ))}
    </Grid>
  );
}
