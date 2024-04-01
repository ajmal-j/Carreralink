import BuildCreateJobController from "./create.js";
import BuildGetJobByIdController from "./getJobById.js";
import BuildAllJobsController from "./allJobs.js";
import BuildAllCompanyJobsController from "./getAllJobsByCompanyId.js";
import BuildUpdateJobController from "./update.js";
import BuildGetAllLocationsController from "./getLocations.js";
import BuildCreateJobByRecruiterController from "./createJobByRecruiter.js";
import BuildSaveJobController from "./saveJob.js";
import BuildGetAllSavedJobsController from "./getAllSavedJobs.js";
import BuildRemoveSavedJobController from "./removeSavedJob.js";
import BuildIsSavedController from "./isSaved.js";

const create = BuildCreateJobController();
const getJobById = BuildGetJobByIdController();
const allJobs = BuildAllJobsController();
const allCompanyJobs = BuildAllCompanyJobsController();
const updateJob = BuildUpdateJobController();
const allLocations = BuildGetAllLocationsController();
const createJobByRecruiter = BuildCreateJobByRecruiterController();
const saveJob = BuildSaveJobController();
const getAllSavedJobs = BuildGetAllSavedJobsController();
const removeSavedJob = BuildRemoveSavedJobController();
const isSaved = BuildIsSavedController();

export const jobController = {
  create,
  getJobById,
  allCompanyJobs,
  updateJob,
  allJobs,
  allLocations,
  createJobByRecruiter,
  saveJob,
  getAllSavedJobs,
  removeSavedJob,
  isSaved,
};

export type IJobController = typeof jobController;
