import { Repositories } from "../database/index.js";
import { AddCategoryUsecase } from "./admin/addCategory.usecase.js";
import { AddSkillsUsecase } from "./admin/addSkills.usecase.js";
import { SkillsAndCategoryUsecase } from "./admin/getSkillsAndCategory.usecase.js";
import { RemoveCategoryUsecase } from "./admin/removeCategory.usecase.js";
import { RemoveSkillUsecase } from "./admin/removeSkill.usecase.js";

const addCategoryUsecase = new AddCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);
const addSkillsUsecase = new AddSkillsUsecase(
  Repositories.SkillsAndCategoryRepository
);

const getSkillsAndCategory = new SkillsAndCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);

const removeSkillUsecase = new RemoveSkillUsecase(
  Repositories.SkillsAndCategoryRepository
);

const removeCategoryUsecase = new RemoveCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);

export {
  addCategoryUsecase,
  addSkillsUsecase,
  getSkillsAndCategory,
  removeCategoryUsecase,
  removeSkillUsecase,
};
