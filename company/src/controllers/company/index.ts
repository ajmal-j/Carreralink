import BuildAllCompanies from "./allCompanies.js";
import BuildGet from "./get.js";
import BuildData from "./data.js";
import BuildUpdate from "./update.js";
import BuildAllJobs from "./allJobs.js";
import BuildJobs from "./jobs.js";

const allCompanies = BuildAllCompanies();
const get = BuildGet();
const data = BuildData();
const update = BuildUpdate();
const allJobs = BuildAllJobs();
const jobs = BuildJobs();

export const companyController = {
  allCompanies,
  get,
  allJobs,
  data,
  update,
  jobs,
};

export type ICompanyController = typeof companyController;
