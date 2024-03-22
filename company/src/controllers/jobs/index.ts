import BuildCreateJobController from "./create.js";
import BuildGetJobByIdController from "./getJobById.js";
import BuildAllJobsController from "./allJobs.js";
import BuildAllCompanyJobsController from "./getAllJobsByCompanyId.js";
import BuildUpdateJobController from "./update.js";

const create = BuildCreateJobController();
const getJobById = BuildGetJobByIdController();
const allJobs = BuildAllJobsController();
const allCompanyJobs = BuildAllCompanyJobsController();
const updateJob = BuildUpdateJobController();

export const jobController = {
  create,
  getJobById,
  allCompanyJobs,
  updateJob,
  allJobs,
};


export type IJobController = typeof jobController;
