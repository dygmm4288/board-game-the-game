import { NextFunction, Request, Response } from "express";
import hash from "../utils/hash";
export interface AuthenticateRequest extends Request {
  user?: { id: string; name: string };
}

export const authenticate = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ detail: "Unauthorized" });

  try {
    const data = (await hash.decodeToken(token)) as {
      id: string;
      name: string;
    };

    req.user = data;

    next();
  } catch (err) {
    res.status(401).json({ detail: "Unauthorized" });
  }
};

export const try_authenticate = async (
  req: AuthenticateRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const data = (await hash.decodeToken(token)) as {
        id: string;
        name: string;
      };
      req.user = data;
    } catch (err) {}
  }

  next();
};
