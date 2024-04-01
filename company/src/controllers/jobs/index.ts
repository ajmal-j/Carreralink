import BuildCreateJobController from "./create.js";
import BuildGetJobByIdController from "./getJobById.js";
import BuildAllJobsController from "./allJobs.js";
import BuildAllCompanyJobsController from "./getAllJobsByCompanyId.js";
import BuildUpdateJobController from "./update.js";
import BuildGetAllLocationsController from "./getLocations.js";
import BuildCreateJobByRecruiterController from "./createJobByRecruiter.js";

const create = BuildCreateJobController();
const getJobById = BuildGetJobByIdController();
const allJobs = BuildAllJobsController();
const allCompanyJobs = BuildAllCompanyJobsController();
const updateJob = BuildUpdateJobController();
const allLocations = BuildGetAllLocationsController();
const createJobByRecruiter = BuildCreateJobByRecruiterController();

export const jobController = {
  create,
  getJobById,
  allCompanyJobs,
  updateJob,
  allJobs,
  allLocations,
  createJobByRecruiter,
};

export type IJobController = typeof jobController;
