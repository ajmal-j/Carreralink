import { ISkillsAndCategoryRepoType } from "../../database/index.js";

export class SkillsAndCategoryUsecase {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}

  async execute() {
    return await this.SkillsAndCategoryRepository.getSkillsAndCategory();
  }
}
