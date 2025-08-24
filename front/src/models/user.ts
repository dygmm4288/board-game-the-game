import Base from "./base";

export default class User extends Base {
  name!: string;
  password!: null;
  constructor(data: User) {
    super(data as Base);
    this.name = data.name;
    this.password = null;
  }

  static create(data: User | User[]) {
    if (Array.isArray(data)) return data.map((v) => new User(v));
    return new User(data);
  }
}
