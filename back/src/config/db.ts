import { DataSource } from "typeorm";
import { GameModel } from "../modules/game-engine/game-engine.model";
import { UserModel } from "../modules/user/user.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "myuser",
  password: "mypassword",
  database: "board_game_db",
  entities: [GameModel, UserModel],
  synchronize: true,
});
