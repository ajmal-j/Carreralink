import BuildAllCompanies from "./allCompanies.js";
import BuildGet from "./get.js";
import BuildData from "./data.js";
import BuildUpdate from "./update.js";
import BuildAllJobs from "./allJobs.js";

const allCompanies = BuildAllCompanies();
const get = BuildGet();
const data = BuildData();
const update = BuildUpdate();
const allJobs = BuildAllJobs();
export const companyController = {
  allCompanies,
  get,
  allJobs,
  data,
  update,
};

export type ICompanyController = typeof companyController;
