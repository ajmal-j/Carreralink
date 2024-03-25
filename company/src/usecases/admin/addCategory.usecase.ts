import { ISkillsAndCategoryRepoType } from "../../database/index.js";

export class AddCategoryUsecase {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}

  async execute(data: string[]) {
    return await this.SkillsAndCategoryRepository.addCategory(data);
  }
}
