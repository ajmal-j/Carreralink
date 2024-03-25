import { ISkillsAndCategoryRepoType } from "../../database/index.js";

export class AddSkillsUsecase {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}

  async execute(data: string[]) {
    return await this.SkillsAndCategoryRepository.addSkills(data);
  }
}
