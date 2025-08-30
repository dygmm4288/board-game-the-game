import type { $ZodIssue } from "zod/v4/core";

export const fromZod = <T extends Record<string, T[keyof T]>>(
  errors: $ZodIssue[]
) => {
  const out = {} as Partial<Record<keyof T, string>>;

  errors.forEach((error) => {
    const key = error.path?.[0] as keyof T | undefined;
    if (key !== undefined) out[key] = error.message;
  });

  return out;
};
