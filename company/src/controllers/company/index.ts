import BuildAllCompanies from "./allCompanies.js";
import BuildGet from "./get.js";
import BuildData from "./data.js";
import BuildUpdate from "./update.js";
import BuildAllJobs from "./allJobs.js";
import BuildJobs from "./jobs.js";
import BuildVerifiedCompanies from "./verifiedCompanies.js";
import BuildUnverifiedCompanies from "./unverifiedCompanies.js";

const allCompanies = BuildAllCompanies();
const get = BuildGet();
const data = BuildData();
const update = BuildUpdate();
const allJobs = BuildAllJobs();
const jobs = BuildJobs();
const verifiedCompanies = BuildVerifiedCompanies();
const unverifiedCompanies = BuildUnverifiedCompanies();

export const companyController = {
  allCompanies,
  get,
  allJobs,
  data,
  update,
  jobs,
  verifiedCompanies,
  unverifiedCompanies,
};

export type ICompanyController = typeof companyController;
