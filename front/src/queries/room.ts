import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import { roomApi } from "../api/services";
import type { CreateRoomPayload } from "../models/room";
import type { Room } from "../types/room.type";

const RoomQueryKey = {
  GET: ["get-rooms"] as const,
  GET_ONE: "get-room",
  ACTIVE_ROOM: ["active-room"] as const,
};

export const useRoom = (params?: AxiosRequestConfig) => {
  return useQuery<Room[]>({
    queryKey: RoomQueryKey.GET,
    queryFn: () => roomApi.get<Room[]>(params).then((r) => r.data),
  });
};

export const useCreateRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoomPayload) => roomApi.post<Room>(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RoomQueryKey.GET });
    },
  });
};

export const useActiveRoom = (enabled: boolean) => {
  return useQuery<Room | null>({
    queryKey: RoomQueryKey.ACTIVE_ROOM,
    queryFn: () => roomApi.getOne<Room>("/me/active-room").then((r) => r.data),
    enabled,
  });
};
