import { IUser } from "../../entities/user.entity.js";
import { UserModelType, IUserAuth } from "../models/user.model.js";

export interface IUserRepo {
  database: UserModelType;
  createUser(user: IUser): Promise<IUserAuth>;
  isAlreadyTaken(user: {
    email?: string;
    contact?: number;
    username?: string;
  }): Promise<unknown>;
  findByEmail(email: string): Promise<IUserAuth | null>;
  updateBlock({
    email,
    isBlocked,
  }: {
    email: string;
    isBlocked: boolean;
  }): Promise<void>;
}

export class UserRepository implements IUserRepo {
  constructor(public readonly database: UserModelType) {}

  async createUser(user: IUser): Promise<IUserAuth> {
    return await this.database.create(user);
  }

  async isAlreadyTaken({
    email,
    contact,
    username,
  }: {
    email?: string;
    contact?: number;
    username?: string;
  }): Promise<unknown> {
    return await this.database.findOne({
      $or: [{ email }, { contact }, { username }],
    });
  }

  async findByEmail(email: string): Promise<IUserAuth | null> {
    return await this.database.findOne({ email });
  }

  async updateBlock({
    email,
    isBlocked,
  }: {
    email: string;
    isBlocked: boolean;
  }) {
    await this.database.findOneAndUpdate({ email }, { isBlocked });
  }
}
