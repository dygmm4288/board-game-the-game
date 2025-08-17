import { useQuery } from "@tanstack/react-query";
import { roomApi } from "../api/services";
import type { Room } from "../types/room.type";

const RoomQueryKey = {
  get: ["get-rooms"] as const,
  get_one: "get-room",
};

const useRoom = (params?: unknown) => {
  return useQuery<Room[]>({
    queryKey: RoomQueryKey.get,
    queryFn: () => roomApi.get(params).then((r) => r.data),
  });
};

export { useRoom };
