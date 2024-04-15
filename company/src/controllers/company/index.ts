import BuildAllCompanies from "./allCompanies.js";
import BuildAllJobs from "./allJobs.js";
import BuildCompanyList from "./companyList.js";
import BuildData from "./data.js";
import BuildGet from "./get.js";
import BuildSkillsAndCategories from "./getSkillsAndCategory.js";
import BuildGetTotalCount from "./getTotalCount.js";
import BuildIsVerified from "./isVerified.js";
import BuildJobs from "./jobs.js";
import BuildUpdate from "./update.js";
import BuildUpdateCoverPhoto from "./updateCoverPhoto.js";

const allCompanies = BuildAllCompanies();
const get = BuildGet();
const data = BuildData();
const update = BuildUpdate();
const allJobs = BuildAllJobs();
const jobs = BuildJobs();
const isVerified = BuildIsVerified();
const getSkillsAndCategories = BuildSkillsAndCategories();
const companyList = BuildCompanyList();
const updateCoverPhoto = BuildUpdateCoverPhoto();
const getTotalCount = BuildGetTotalCount();

export const companyController = {
  allCompanies,
  get,
  allJobs,
  data,
  update,
  jobs,
  isVerified,
  getSkillsAndCategories,
  companyList,
  updateCoverPhoto,
  getTotalCount,
};

export type ICompanyController = typeof companyController;
