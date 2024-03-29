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

export class UserRepository {
  constructor(public readonly database: UserModelType) {}

  async createUser(user: IUser): Promise<IUserAuth> {
    return await this.database.create(user);
  }

  async markAsVerified(email: string) {
    return await this.database.findOneAndUpdate(
      { email },
      { isVerified: true },
      {
        new: true,
      }
    );
  }
  async deleteUsers(users: string[]) {
    return await this.database.deleteMany({ email: { $in: users } });
  }
  async isAlreadyTaken({
    email,
    contact,
    username,
  }: {
    email?: string;
    contact?: number;
    username?: string;
  }): Promise<IUser | null> {
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
