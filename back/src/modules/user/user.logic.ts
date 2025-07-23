import hash from "../../utils/hash";
export const comparePassword = async (encodedPwd: string, plainPwd: string) => {
  return await hash.compareHash(encodedPwd, plainPwd);
};

export const hashPassword = async (plainPwd: string) => {
  return await hash.generateHash(plainPwd);
};
