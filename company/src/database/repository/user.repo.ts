import { IUser, UserModelType } from "../models/user.model.js";

export class UserRepository {
  constructor(private readonly database: UserModelType) {}

  async create(data: IUser): Promise<IUser | void> {
    const userExist = await this.database.findOne({ email: data.email });
    if (userExist) return console.log("User already exists.");
    else return await this.database.create(data);
  }
  async totalUsers(): Promise<number> {
    return await this.database.countDocuments();
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
  async yearlyUsersGraphDataByAdmin() {
    const result = await this.database.aggregate([
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const now = new Date().getFullYear();

    const data = Array.from({ length: now - 2022 }, () => 0);
    for (const res of result) {
      data[res._id - 2023] = res.count;
    }
    return data;
  }
  async monthlyUsersGraphDataByAdmin() {
    const result = await this.database.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const data = Array.from({ length: 12 }, () => 0);
    for (const res of result) {
      data[res._id - 1] = res.count;
    }
    return data;
  }
}
