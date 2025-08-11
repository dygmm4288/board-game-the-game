import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { GameEngineModel } from "../gameEngine/gameEngine.model";
import { UserModel } from "../user/user.model";
import { RoomModel } from "./room.model";

class RoomService {
  private roomRepository: Repository<RoomModel>;

  constructor() {
    this.roomRepository = AppDataSource.getRepository(RoomModel);
  }

  async createRoom(
    user: UserModel,
    capacity: number,
    game: GameEngineModel,
    slug: string,
  ): Promise<RoomModel> {
    const room = this.roomRepository.create({
      author: user,
      capacity: capacity,
      game,
      slug,
    });

    await room.save();

    return room;
  }

  async getRooms() {
    return;
  }
}

export default new RoomService();
