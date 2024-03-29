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

  async getUsers(query: { p: number; q?: string }) {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };
    const aggregation = this.database.aggregate([
      {
        $match: {
          email: {
            $not: {
              $eq: "admin@gmail.com",
            },
          },
          ...(query?.q
            ? {
                $text: {
                  $search: query.q,
                  $caseSensitive: false,
                },
              }
            : {}),
        },
      },
      {
        $project: {
          username: 1,
          email: 1,
          jobs: 1,
          isBlocked: 1,
        },
      },
    ]);
    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }

  async toggleBlock(email: string) {
    const user = await this.database.findOne({ email });
    if (!user) throw new Error("User not found");
    user.isBlocked = !user.isBlocked;
    return await user.save();
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    return await this.database.findOne({ email });
  }

  async updateProfile(email: string, data: Record<string, any>) {
    return await this.database.findOneAndUpdate({ email }, data, {
      new: true,
    });
  }

  async isAlreadyTaken({
    contact,
    email,
    username,
  }: {
    email?: string;
    contact?: number;
    username?: string;
  }): Promise<string | null> {
    if (!email || !contact || !username) return null;
    const user1 = await this.database.findOne({
      $and: [
        { username: { $regex: "^" + username + "$", $options: "i" } },
        { email: { $ne: email } },
      ],
    });

    const user2 = await this.database.findOne({
      $and: [{ contact }, { email: { $ne: email } }],
    });
    return user1 ? "Username" : user2 ? "Contact" : null;
  }

  async updateEducation(email: string, dataToUpdate: Record<string, any>) {
    const { id, ...data } = dataToUpdate;
    return await this.database.findOneAndUpdate(
      { email, "education._id": id },
      { $set: { "education.$": data } },
      {
        new: true,
      }
    );
  }

  async addEducation(email: string, data: Record<string, any>) {
    return await this.database.findOneAndUpdate(
      { email: email },
      { $push: { education: data } },
      {
        new: true,
      }
    );
  }

  async deleteEducation(email: string, id: string) {
    return await this.database.findOneAndUpdate(
      { email: email },
      { $pull: { education: { _id: id } } },
      {
        new: true,
      }
    );
  }

  async addExperience(email: string, data: Record<string, any>) {
    return await this.database.findOneAndUpdate(
      { email: email },
      { $push: { experience: data } },
      {
        new: true,
      }
    );
  }

  async updateExperience(email: string, dataToUpdate: Record<string, any>) {
    const { id, ...data } = dataToUpdate;
    return await this.database.findOneAndUpdate(
      { email, "experience._id": id },
      { $set: { "experience.$": data } },
      {
        new: true,
      }
    );
  }

  async findByUsername(username: string) {
    return await this.database.findOne({
      username,
    });
  }

  async deleteUsers(users: string[]) {
    const user = await this.database.find({ _id: { $in: users } });
    await this.database.deleteMany({ _id: { $in: users } });
    return user;
  }

  async deleteExperience(email: string, id: string) {
    return await this.database.findOneAndUpdate(
      { email: email },
      { $pull: { experience: { _id: id } } },
      {
        new: true,
      }
    );
  }

  async addSkills(email: string, data: string[]) {
    return await this.database.findOneAndUpdate(
      { email },
      { $set: { skills: data } },
      {
        new: true,
      }
    );
  }

  async updateProfilePic(email: string, profile: string) {
    return await this.database.findOneAndUpdate(
      { email: email },
      { profile: profile }
    );
  }
}
