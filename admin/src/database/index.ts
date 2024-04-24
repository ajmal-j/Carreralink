import { PlanModel } from "./models/plan.model.js";
import { SkillAndCategoryModel } from "./models/skillAndCategory.model.js";
import { UserModel } from "./models/user.model.js";
import { PlanRepository } from "./repository/plan.repo.js";
import { SkillsAndCategoryRepository } from "./repository/skillsAndCategory.repo.js";
import { UserRepository } from "./repository/user.repo.js";

export const Repositories = {
  SkillsAndCategoryRepository: new SkillsAndCategoryRepository(
    SkillAndCategoryModel
  ),
  UserRepository: new UserRepository(UserModel),
  PlanRepository: new PlanRepository(PlanModel),
};

export type IUserRepoType = typeof Repositories.UserRepository;

export type ISkillsAndCategoryRepoType =
  typeof Repositories.SkillsAndCategoryRepository;

export type IPlanRepoType = typeof Repositories.PlanRepository;
