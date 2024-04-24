import { ISkillsAndCategoryRepoType } from "../../../../admin/src/database/index.js";

export class SkillsAndCategoryUsecase {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}

  async execute() {
    return await this.SkillsAndCategoryRepository.getSkillsAndCategory();
  }
}
