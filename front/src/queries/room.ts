import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomApi } from "../api/services";
import type { CreateRoomPayload } from "../models/room";
import type { Room } from "../types/room.type";

const RoomQueryKey = {
  get: ["get-rooms"] as const,
  get_one: "get-room",
};

export const useRoom = (params?: unknown) => {
  return useQuery<Room[]>({
    queryKey: RoomQueryKey.get,
    queryFn: () => roomApi.get(params).then((r) => r.data),
  });
};

export const useCreateRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoomPayload) => roomApi.post<Room>(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RoomQueryKey.get });
    },
  });
};
