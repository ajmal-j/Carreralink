import { eventProducer } from "../../events/producer/producer.js";
import BuildAddCategory from "./addCategory.js";
import BuildAddSkills from "./addSkills.js";
import BuildDeleteJobs from "./deleteJobs.js";
import BuildEditCompany from "./editCompany.js";
import BuildEditJob from "./editJob.js";
import BuildGetJobs from "./getJobs.js";
import BuildRejectCompany from "./rejectCompany.js";
import BuildRemoveCategory from "./removeCategory.js";
import BuildRemoveSkill from "./removeSkills.js";
import BuildUnverifiedCompanies from "./unverifiedCompanies.js";
import BuildVerifiedCompanies from "./verifiedCompanies.js";
import BuildVerifyCompany from "./verifyCompany.js";
import BuildGetTotalCount from "./getTotalCount.js";

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
const editCompany = BuildEditCompany();
const totalCount = BuildGetTotalCount();

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
  editCompany,
  totalCount,
};

export type IAdminController = typeof adminControllers;
