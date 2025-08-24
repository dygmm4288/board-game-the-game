import { NextFunction, Request, Response } from "express";
import { invoke, isNil, mapValues } from "lodash";
import { AssertionError } from "./error";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next)
      .then((result) => {
        if (isNil(result)) return res.sendStatus(201);

        if (Array.isArray(result)) {
          const data = result.map((r) => {
            return invoke(r, "hideEntity") || r;
          });
          return res.status(200).json(data);
        }

        const data = mapValues(result, (value) => {
          if (Array.isArray(value))
            return value.map((v) => v?.hideEntity() || v);
          if (value?.hideEntity) return value.hideEntity();
          return value;
        });

        return res.status(200).json(data);
      })
      .catch(next);
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
