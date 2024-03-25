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

  async getUsers(query: { p: number }) {
    const options = {
      page: query?.p ?? 1,
      limit: 10,
    };

    const aggregation = this.database.aggregate([
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
