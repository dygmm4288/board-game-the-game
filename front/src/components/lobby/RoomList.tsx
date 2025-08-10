import RoomCard from "./RoomCard";

export default function RoomList() {
  return (
    <ul>
      <li>
        <RoomCard gameId={"game-1"} />
      </li>
      <li>
        <RoomCard gameId={"game-2"} />
      </li>
      <li>
        <RoomCard gameId={"game-3"} />
      </li>
      <li>
        <RoomCard gameId={"game-4"} />
      </li>
    </ul>
  );
}
