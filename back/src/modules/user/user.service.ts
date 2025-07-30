import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { UserModel } from "./user.model";

export class UserService {
  private userRepository: Repository<UserModel>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserModel);
  }

  public async postUser(
    userData: Pick<UserModel, "name" | "password">,
  ): Promise<UserModel> {
    const newUser = this.userRepository.create({
      name: userData.name,
      password: userData.password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  public async getUser(name: string): Promise<UserModel | null> {
    const user = await this.userRepository.findOneBy({ name });
    return user;
  }

  public async putAttr(model: UserModel) {
    const ret = await this.userRepository.save(model);
    return ret;
  }
}

export default new UserService();
