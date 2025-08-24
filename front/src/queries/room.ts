import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomApi } from "../api/services";
import type { Room } from "../types/room.type";

export type CreateRoomPayload = {
  name: string;
  kind: string;
  capacity: number;
};

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

export function useCreateRoom() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoomPayload) => roomApi.post<Room>(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RoomQueryKey.get });
    },
  });
}

export { useRoom };
