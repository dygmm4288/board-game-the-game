import { Repository } from "typeorm";
import { AppDataSource } from "../../config/db";
import { UserModel } from "./user.model";

export class UserService {
  private userRepository: Repository<UserModel>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserModel);
  }

  async postUser(
    userData: Pick<UserModel, "name" | "password">,
  ): Promise<UserModel> {
    const newUser = this.userRepository.create({
      name: userData.name,
      password: userData.password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async getUser(name: string): Promise<UserModel | null> {
    const user = await this.userRepository.findOneBy({ name });
    return user;
  }
}
