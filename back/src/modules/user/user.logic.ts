import bcrypt from "bcrypt";
export const comparePassword = async (encodedPwd: string, plainPwd: string) => {
  const hashedPwd = await hashPassword(plainPwd);

  return hashedPwd === encodedPwd;
};

export const hashPassword = async (plainPwd: string) => {
  return await bcrypt.hash(plainPwd, 10);
};
