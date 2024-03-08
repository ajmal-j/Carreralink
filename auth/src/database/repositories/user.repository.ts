import { NotFoundError } from "@carreralink/common";
import { IUser } from "../../entities/user.entity";
import { UserModelType, IUserAuth } from "../models/user.model";

export interface IUserRepo {
  database: UserModelType;
  createUser(user: IUser): Promise<IUserAuth>;
  isAlreadyTaken(): Promise<IUserAuth>;
  findByEmail(email: string): Promise<IUserAuth | null>;
}

export class UserRepository implements IUserRepo {
  constructor(public readonly database: UserModelType) {}

  async createUser(user: IUser): Promise<IUserAuth> {
    return await this.database.create(user);
  }

  async isAlreadyTaken(
    email?: string,
    contact?: number,
    username?: string
  ): Promise<IUserAuth> {
    const user = await this.database.findOne({
      $or: [{ email }, { contact }, { username }],
    });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async findByEmail(email: string): Promise<IUserAuth | null> {
    return await this.database.findOne({ email });
  }
}
