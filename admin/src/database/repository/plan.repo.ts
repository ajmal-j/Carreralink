import { IPlan, IPlanModel } from "../models/plan.model.js";

export class PlanRepository {
  constructor(private readonly database: IPlanModel) {}

  async create(data: IPlan) {
    return await this.database.create(data);
  }
  async plan(id: string) {
    return await this.database.findOne({ _id: id });
  }

  async getUserPlans() {
    return await this.database.find({
      $and: [{ for: "user" }, { isDeleted: false }],
    });
  }

  async getCompanyPlans() {
    return await this.database.find({
      $and: [{ for: "company" }, { isDeleted: false }],
    });
  }

  async delete({ id }: { id: string }) {
    return await this.database.updateOne(
      { _id: id },
      { $set: { isDeleted: true } }
    );
  }

  async update({ data, plan }: { data: IPlan; plan: string }) {
    return await this.database.findOneAndUpdate(
      { _id: plan },
      {
        $set: {
          ...data,
        },
      },
      { new: true }
    );
  }
}
