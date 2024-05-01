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
import BuildApplyJobController from "./applyJob.js";
import BuildWithdrawJobController from "./withdrawApplied.js";
import BuildGetAppliedJobsController from "./getAppliedJobs.js";
import BuildIsAppliedController from "./isApplied.js";
import BuildGetApplicantsController from "./getApplicants.js";
import BuildUpdateStatusByRecruiterController from "./updateStatusByRecruiter.js";
import BuildUpdateStatusByCompanyController from "./updateStatusByCompany.js";
import BuildUpdateAssessmentController from "./updateAssessment.js";
import { eventProducer } from "../../events/producer/producer.js";
import BuildUpdateApplicantAssessmentController from "./updateApplicationAssessment.js";

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
const apply = BuildApplyJobController({
  eventProducer,
});
const withdraw = BuildWithdrawJobController();
const getAppliedJobs = BuildGetAppliedJobsController();
const isApplied = BuildIsAppliedController();
const applicants = BuildGetApplicantsController();
const updateStatusByRecruiter = BuildUpdateStatusByRecruiterController();
const updateStatusByCompany = BuildUpdateStatusByCompanyController();
const updateAssessment = BuildUpdateAssessmentController();
const updateApplicantAssessment = BuildUpdateApplicantAssessmentController();

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
  apply,
  withdraw,
  getAppliedJobs,
  isApplied,
  applicants,
  updateStatusByRecruiter,
  updateStatusByCompany,
  updateAssessment,
  updateApplicantAssessment,
};

export type IJobController = typeof jobController;
