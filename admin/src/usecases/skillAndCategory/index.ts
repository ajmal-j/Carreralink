import { Repositories } from "../../database/index.js";
import { AddCategoryUsecase } from "./addCategory.usecase.js";
import { AddSkillsUsecase } from "./addSkills.usecase.js";
import { SkillsAndCategoryUsecase } from "./getSkillsAndCategory.usecase.js";
import { RemoveCategoryUsecase } from "./removeCategory.usecase.js";
import { RemoveSkillUsecase } from "./removeSkill.usecase.js";

const addCategory = new AddCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);
const addSkills = new AddSkillsUsecase(
  Repositories.SkillsAndCategoryRepository
);

const getSkillsAndCategory = new SkillsAndCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);

const removeSkill = new RemoveSkillUsecase(
  Repositories.SkillsAndCategoryRepository
);

const removeCategory = new RemoveCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);

export const SkillAndCategoryUsecase = {
  addCategory,
  addSkills,
  getSkillsAndCategory,
  removeCategory,
  removeSkill,
};
