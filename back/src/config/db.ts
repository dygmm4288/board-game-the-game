import path from "path";
import { DataSource } from "typeorm";

console.log(path.join(__dirname, "../modules/**/*.model.js"));
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "myuser",
  password: "mypassword",
  database: "board_game_db",
  entities: [path.join(__dirname, "../modules/**/*.model.js")],
  synchronize: true,
});
