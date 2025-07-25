import express, { Application } from "express";
import request from "supertest";
import gameController from "../game.controller";
import { Game } from "../game.model";
import { GameService } from "../game.service";

const app: Application = express();

app.use(express.json());
app.post("/games", gameController.createGame);

jest.mock("../game.service");

describe("POST /games", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("요청이 들어오면 올바르게 게임을 만들어서 반환해야 한다.", async () => {
    const fakeGame: Partial<Game> = {
      id: "test-game",
      players: [{ id: "p1", name: "p1", hand: [] }],
    };

    (GameService.setupNewGame as jest.Mock).mockReturnValue(fakeGame);

    const response = await request(app).post("/games");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(fakeGame);
  });
});
