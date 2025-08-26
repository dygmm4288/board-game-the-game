import { AuthenticateRequest } from "../../middlewares/auth.middleware";
import { GameKind } from "../../types/game";
import { AssertionError } from "../../utils/error";
import { asyncHandler } from "../../utils/middleware";
import { GAME_KIND } from "../gameEngine/constants";
import gameEngineService from "../gameEngine/gameEngine.service";
import { UserModel } from "../user/user.model";
import { CreateRoomDto } from "./room.dto";
import roomService from "./room.service";

class RoomController {
  public createRoom = asyncHandler(async (req: AuthenticateRequest) => {
    const user = req.user as UserModel;
    const { kind, slug, capacity } = CreateRoomDto.parse(req.body);

    const isGameKind = (x: unknown): x is GameKind =>
      Object.values(GAME_KIND).includes(x as GameKind);

    if (!isGameKind(kind))
      throw new AssertionError("올바르지 않은 접근입니다", 400);

    const game = await gameEngineService.createGame(user, kind);
    const room = await roomService.createRoom(user, capacity, game, slug);

    return room;
  });

  public joinRoom = asyncHandler(async (req: AuthenticateRequest) => {});

  public getRooms = asyncHandler(async (req: AuthenticateRequest) => {
    const { page = "1", limit = "20" } = req.query;
    const rooms = await roomService.getRooms({ page, limit });

    return rooms;
  });

  public getActiveRoom = asyncHandler(async (req: AuthenticateRequest) => {
    const user = req.user as UserModel;

    return await roomService.getActiveRoom(user);
  });

  public getRoomOne = asyncHandler(async (req: AuthenticateRequest) => {
    const { id } = req.params;
    if (!id) return null;

    const user = req.user as UserModel;

    const userActiveRoom = await roomService.getActiveRoom(user);
    const room = await roomService.getRoom(id);

    if (!room || !userActiveRoom) return null;
    if (room.id !== userActiveRoom.id) return null;

    return room;
  });
}

export default new RoomController();
