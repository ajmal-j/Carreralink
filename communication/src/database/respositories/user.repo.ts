import { IUser, UserModelType } from "../models/user.model.js";

export class UserRepository {
  constructor(private readonly database: UserModelType) {}

  async create(data: IUser): Promise<IUser | void> {
    const userExist = await this.database.findOne({ email: data.email });
    if (userExist) return console.log("User already exists.");
    else return await this.database.create(data);
  }
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.database.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await this.database.findOne({ _id: id });
  }
  async update({
    email,
    userData,
  }: {
    email: string;
    userData: {
      username: string;
      profile: string;
    };
  }) {
    const updatedUser = await this.database.findOneAndUpdate(
      { email },
      {
        $set: {
          ...userData,
        },
      },
      { new: true }
    );
    if (!updatedUser) return console.log("User not found");
    return updatedUser;
  }
}
