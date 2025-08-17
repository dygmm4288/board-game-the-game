import { useState } from "react";
import room from "../api/room";

const useRoom = () => {
  const [rooms, setRooms] = useState([
    { id: "game-1" },
    { id: "game-2" },
    { id: "game-3" },
    { id: "game-4" },
  ]);

  const fetchRoom = () => {
    room
      .get({})
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return {
    rooms,
    fetchRoom,
  };
};

export default useRoom;
