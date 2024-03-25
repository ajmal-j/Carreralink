import { ISkillsAndCategoryModel } from "../models/skillAndCategoryModel.model.js";

export class SkillsAndCategoryRepository {
  constructor(private readonly database: ISkillsAndCategoryModel) {}

  async getSkillsAndCategory() {
    const data = await this.database.find();
    return data;
  }

  async addSkills(data: string[]) {
    return await this.database.updateOne(
      {},
      { $push: { skills: { $each: data } } },
      { upsert: true }
    );
  }

  async addCategory(data: string[]) {
    return await this.database.updateOne(
      {},
      { $push: { category: { $each: data } } },
      { upsert: true }
    );
  }

  async removeSkill(skill: string) {
    return await this.database.updateOne(
      {},
      { $pull: { skills: skill } },
      { upsert: true }
    );
  }

  async removeCategory(category: string) {
    return await this.database.updateOne(
      {},
      { $pull: { category: category } },
      { upsert: true }
    );
  }
}
