import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;
class Hash {
  constructor() {}

  decodeToken(token: string) {
    return new Promise((res, rej) => {
      jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) return rej(err);
        return res(data);
      });
    });
  }

  generateToken(payload: object | string, expire?: number) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: expire || "10m" });
  }

  generateHash(data: string) {
    return bcrypt.hash(data, 10);
  }

  compareHash(encoded: string, plain: string) {
    return bcrypt.compare(plain, encoded);
  }
}

export default new Hash();
