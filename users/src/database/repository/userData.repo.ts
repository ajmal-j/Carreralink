import { NotFoundError } from "@carreralink/common";
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

  async updatePlan({
    user,
    plan,
  }: {
    user: string;
    plan: Omit<IUserData["plan"], "freeUsage">;
  }) {
    const userData = await this.database.findOne({
      email: user,
    });
    if (!userData) throw new NotFoundError("User not found");
    userData.plan.currentPlan = plan.currentPlan;
    userData.plan.expiryDate = plan.expiryDate;
    userData.plan.purchaseDate = plan.purchaseDate;
    userData.plan.planType = plan.planType;
    if (!userData.plan.features) userData.plan.features = {};
    for (const key in plan.features) {
      userData.plan.features[key] = true;
    }
    return await userData.save();
  }
  async updatePlanExpiry({
    user,
    plan,
  }: {
    user: string;
    plan: {
      freeUsage: number;
    };
  }) {
    return await this.database.findOneAndUpdate(
      { email: user },
      {
        $set: {
          plan,
        },
      },
      {
        new: true,
      }
    );
  }

  async planUsed(email: string) {
    const user = await this.database.findOne({ email });
    if (!user) return console.log("user not found");
    if (user?.plan?.freeUsage && user?.plan?.planType === "none") {
      user.plan.freeUsage = user.plan.freeUsage - 1;
      await user.save();
    }
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
          profile: 1,
          email: 1,
          jobs: 1,
          isBlocked: 1,
          currentStatus: 1,
        },
      },
    ]);
    const response = await this.database.aggregatePaginate(
      aggregation,
      options
    );
    return response;
  }

  async usersList(query: { q?: string }) {
    const regex = new RegExp(query.q || "", "i");
    const data = await this.database
      .find({
        $and: [
          {
            username: regex,
          },
          {
            email: {
              $not: {
                $eq: "admin@gmail.com",
              },
            },
          },
        ],
      })
      .select("username profile email currentStatus plan")
      .sort({
        "plan.features.searchPriority": -1,
      })
      .limit(10);
    return data;
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

  async updateProfile(
    email: string,
    data: Record<string, any>
  ): Promise<IUserData | null> {
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

  async updateProfilePic(
    email: string,
    profile: string
  ): Promise<IUserData | null> {
    return await this.database.findOneAndUpdate(
      { email: email },
      { profile: profile },
      {
        new: true,
      }
    );
  }

  async addResume({
    email,
    url,
    name,
  }: {
    email: string;
    url: string;
    name: string;
  }): Promise<Pick<IUserData, "resume"> | null> {
    return await this.database.findOneAndUpdate(
      { email: email },
      { $push: { "resume.resumes": { url, name } } },
      {
        new: true,
      }
    );
  }
  async removeResume(
    email: string,
    url: string
  ): Promise<Pick<IUserData, "resume"> | null> {
    return await this.database.findOneAndUpdate(
      { email: email },
      { $pull: { "resume.resumes": { url: url } } },
      { new: true }
    );
  }

  async updateVisibility(
    email: string,
    visibility: boolean
  ): Promise<Pick<IUserData, "resume"> | null> {
    return await this.database.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "resume.visible": visibility,
        },
      },
      {
        new: true,
      }
    );
  }

  async updatePrimaryResume(
    email: string,
    primary: number
  ): Promise<Pick<IUserData, "resume"> | null> {
    return await this.database.findOneAndUpdate(
      { email: email },
      {
        $set: {
          "resume.primary": primary,
        },
      },
      {
        new: true,
      }
    );
  }
}
