import { SkillAndCategoryModel } from "./models/skillAndCategoryModel.model.js";
import { UserModel } from "./models/user.model.js";
import { SkillsAndCategoryRepository } from "./repository/skillsAndCategory.repo.js";
import { UserRepository } from "./repository/user.repo.js";

export const Repositories = {
  SkillsAndCategoryRepository: new SkillsAndCategoryRepository(
    SkillAndCategoryModel
  ),
  UserRepository: new UserRepository(UserModel),
};

export type IUserRepoType = typeof Repositories.UserRepository;
export type ISkillsAndCategoryRepoType =
  typeof Repositories.SkillsAndCategoryRepository;

