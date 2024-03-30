import BuildVerifiedCompanies from "./verifiedCompanies.js";
import BuildUnverifiedCompanies from "./unverifiedCompanies.js";
import BuildVerifyCompany from "./verifyCompany.js";
import BuildRejectCompany from "./rejectCompany.js";
import BuildAddCategory from "./addCategory.js";
import BuildAddSkills from "./addSkills.js";
import BuildRemoveCategory from "./removeCategory.js";
import BuildRemoveSkill from "./removeSkills.js";
import { eventProducer } from "../../events/producer.js";
import BuildGetJobs from "./getJobs.js";
import BuildDeleteJobs from "./deleteJobs.js";
import BuildEditJob from "./editJob.js";

const verifiedCompanies = BuildVerifiedCompanies();
const unverifiedCompanies = BuildUnverifiedCompanies();
const verifyCompany = BuildVerifyCompany();
const rejectCompany = BuildRejectCompany(eventProducer);
const addSkills = BuildAddSkills();
const addCategory = BuildAddCategory();
const removeCategory = BuildRemoveCategory();
const removeSkill = BuildRemoveSkill();
const getJobs = BuildGetJobs();
const deleteJobs = BuildDeleteJobs();
const editJob = BuildEditJob();

export const adminControllers = {
  verifiedCompanies,
  unverifiedCompanies,
  verifyCompany,
  rejectCompany,
  addSkills,
  addCategory,
  removeCategory,
  removeSkill,
  getJobs,
  deleteJobs,
  editJob,
};

export type IAdminController = typeof adminControllers;
