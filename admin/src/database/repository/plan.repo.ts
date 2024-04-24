import { IPlan, IPlanModel } from "../models/plan.model.js";

export class PlanRepository {
  constructor(private readonly database: IPlanModel) {}

  async create(data: IPlan) {
    return await this.database.create(data);
  }

  async getUserPlans() {
    return await this.database.find({
      for: "user",
    });
  }

  async getCompanyPlans() {
    return await this.database.find({
      for: "company",
    });
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
