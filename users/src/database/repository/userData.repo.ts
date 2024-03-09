import { IUser } from "../../entities/userData.entity.js";
import { UserDataModelType, IUserData } from "../models/userData.model.js";

export interface IUserRepo {
  database: UserDataModelType;
  create(userData: IUser): Promise<IUserData>;
  findByEmail(email: string): Promise<IUserData | null>;
}

export class UserDataRepository implements IUserRepo {
  constructor(public readonly database: UserDataModelType) {}

  async create(userData: IUser): Promise<IUserData> {
    return await this.database.create(userData);
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    return await this.database.findOne({ email });
  }
}
