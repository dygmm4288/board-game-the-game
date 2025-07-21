import bcrypt from "bcrypt";
class Hash {
  constructor() {}

  decodeToken() {}
  generateToken() {}
  generateHash(data: string) {
    return bcrypt.hash(data, 10);
  }
}

export default new Hash();
