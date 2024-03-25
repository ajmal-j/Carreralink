import { ISkillsAndCategoryRepoType } from "../../database/index.js";

export class SkillsAndCategoryRepository {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}

  async execute() {
    return await this.SkillsAndCategoryRepository.getSkillsAndCategory();
  }
}
