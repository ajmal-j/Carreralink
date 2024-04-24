import BuildAddCategory from "./addCategory.js";
import BuildAddSkills from "./addSkills.js";
import BuildRemoveCategory from "./removeCategory.js";
import BuildRemoveSkill from "./removeSkills.js";
import BuildGetSkillsAndCategories from "./getSkillsAndCategory.js";

const addSkills = BuildAddSkills();
const addCategory = BuildAddCategory();
const removeCategory = BuildRemoveCategory();
const removeSkill = BuildRemoveSkill();
const getSkillsAndCategories = BuildGetSkillsAndCategories();

export const skillAndCategoryControllers = {
  addSkills,
  addCategory,
  removeCategory,
  removeSkill,
  getSkillsAndCategories,
};

export type ISkillAndCategoryControllers = typeof skillAndCategoryControllers;
