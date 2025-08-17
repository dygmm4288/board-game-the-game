import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { ListParams } from "../../types/api";
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

  async getRooms({ page, limit }: ListParams) {
    page = Math.max(1, Number(page ?? 1));
    limit = Number(limit ?? 20);

    const skip = (page - 1) * limit;

    const qb = this.roomRepository.createQueryBuilder().select();
    qb.orderBy(`${qb.alias}.createdAt`, "DESC").skip(skip).take(limit);
    const [items, total] = await qb.getManyAndCount();

    if (items) return items.map((item) => ({ ...item, queryTotal: total }));

    return [];
  }
}

export default new RoomService();
