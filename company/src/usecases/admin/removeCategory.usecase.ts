import { ISkillsAndCategoryRepoType } from "../../database/index.js";

export class RemoveCategoryUsecase {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}

  async execute(category: string) {
    return await this.SkillsAndCategoryRepository.removeCategory(category);
  }
}
