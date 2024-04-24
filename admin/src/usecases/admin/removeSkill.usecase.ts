import { ISkillsAndCategoryRepoType } from "../../database/index.js";

export class RemoveSkillUsecase {
  constructor(
    private readonly SkillsAndCategoryRepository: ISkillsAndCategoryRepoType
  ) {}
  async execute(skill: string) {
    return await this.SkillsAndCategoryRepository.removeSkill(skill);
  }
}
