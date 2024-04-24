import BuildAllCompanies from "./allCompanies.js";
import BuildAllJobs from "./allJobs.js";
import BuildCompanyList from "./companyList.js";
import BuildData from "./data.js";
import BuildGet from "./get.js";
import BuildGetTotalCount from "./getTotalCount.js";
import BuildIsVerified from "./isVerified.js";
import BuildJobs from "./jobs.js";
import BuildUpdate from "./update.js";
import BuildUpdateCoverPhoto from "./updateCoverPhoto.js";
import BuildGetGraphData from "./getGraphData.js";

const allCompanies = BuildAllCompanies();
const get = BuildGet();
const data = BuildData();
const update = BuildUpdate();
const allJobs = BuildAllJobs();
const jobs = BuildJobs();
const isVerified = BuildIsVerified();
const companyList = BuildCompanyList();
const updateCoverPhoto = BuildUpdateCoverPhoto();
const getTotalCount = BuildGetTotalCount();
const getGraphData = BuildGetGraphData();

export const companyController = {
  allCompanies,
  get,
  allJobs,
  data,
  update,
  jobs,
  isVerified,
  companyList,
  updateCoverPhoto,
  getTotalCount,
  getGraphData,
};

export type ICompanyController = typeof companyController;
