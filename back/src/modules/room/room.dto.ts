import { z } from "zod";
import { GAME_KIND } from "../gameEngine/constants";

export const CreateRoomDto = z.object({
  kind: z.enum(Object.values(GAME_KIND) as [string, ...string[]]),
  slug: z.string().trim().toLowerCase().min(3).max(64),
  capacity: z.coerce.number().int().min(1).max(8),
});
