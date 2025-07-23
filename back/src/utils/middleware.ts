import { NextFunction, Request, Response } from "express";
import { AssertionError } from "./error";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const errorHandler = (
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AssertionError) {
    return res
      .status(err.statusCode)
      .json({ detail: err.message || "잠시 후 다시 시도해 주세요" });
  }

  console.error(err);

  return res.status(500).json({ detail: "잠시 후 다시 시도해 주세요" });
};
