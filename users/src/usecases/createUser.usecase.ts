import { CustomError } from "@carreralink/common";
import { IUserDataRepo } from "../database/index.js";
import { IUser, User } from "../entities/userData.entity.js";

export class CreateUserUsecase {
  constructor(private readonly database: IUserDataRepo) {}

  async execute(userData: IUser) {
    const userExist = await this.database.findByEmail(userData.email);
    if (userExist) throw new CustomError("User already exists", 409);
    const user = new User(userData);
    console.log(user);
    return;
  }
}
