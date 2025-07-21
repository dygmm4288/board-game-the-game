import { UserModel } from "./user.model";

export const getUser = async (
  username: string,
): Promise<UserModel | null> => {};

export const postUser = async (
  username: string,
  password: string,
): Promise<UserModel | null> => {};
