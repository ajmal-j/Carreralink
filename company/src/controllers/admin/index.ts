import BuildVerifiedCompanies from "./verifiedCompanies.js";
import BuildUnverifiedCompanies from "./unverifiedCompanies.js";
import BuildVerifyCompany from "./verifyCompany.js";
import BuildRejectCompany from "./rejectCompany.js";
import BuildAddCategory from "./addCategory.js";
import BuildAddSkills from "./addSkills.js";
import BuildSkillsAndCategories from "./getSkillsAndCategory.js";
import BuildRemoveCategory from "./removeCategory.js";
import BuildRemoveSkill from "./removeSkills.js";

const verifiedCompanies = BuildVerifiedCompanies();
const unverifiedCompanies = BuildUnverifiedCompanies();
const verifyCompany = BuildVerifyCompany();
const rejectCompany = BuildRejectCompany();
const addSkills = BuildAddSkills();
const addCategory = BuildAddCategory();
const getSkillsAndCategories = BuildSkillsAndCategories();
const removeCategory = BuildRemoveCategory();
const removeSkill = BuildRemoveSkill();

export const adminControllers = {
  verifiedCompanies,
  unverifiedCompanies,
  verifyCompany,
  rejectCompany,
  addSkills,
  addCategory,
  getSkillsAndCategories,
  removeCategory,
  removeSkill,
};

export type IAdminController = typeof adminControllers;
