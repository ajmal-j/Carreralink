import BuildAllCompanies from "./allCompanies.js";
import BuildGet from "./get.js";
import BuildData from "./data.js";
import BuildUpdate from "./update.js";
import BuildAllJobs from "./allJobs.js";
import BuildJobs from "./jobs.js";
import BuildSkillsAndCategories from "./getSkillsAndCategory.js";
import BuildIsVerified from "./isVerified.js";
import BuildCompanyList from "./companyList.js";

const allCompanies = BuildAllCompanies();
const get = BuildGet();
const data = BuildData();
const update = BuildUpdate();
const allJobs = BuildAllJobs();
const jobs = BuildJobs();
const isVerified = BuildIsVerified();
const getSkillsAndCategories = BuildSkillsAndCategories();
const companyList = BuildCompanyList();

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
};

export type ICompanyController = typeof companyController;
