import { eventProducer } from "../../events/producer/producer.js";
import BuildDeleteJobs from "./deleteJobs.js";
import BuildEditCompany from "./editCompany.js";
import BuildEditJob from "./editJob.js";
import BuildGetJobs from "./getJobs.js";
import BuildRejectCompany from "./rejectCompany.js";
import BuildUnverifiedCompanies from "./unverifiedCompanies.js";
import BuildVerifiedCompanies from "./verifiedCompanies.js";
import BuildVerifyCompany from "./verifyCompany.js";
import BuildGetTotalCount from "./getTotalCount.js";
import BuildGetGraphData from "./getGraphData.js";

const verifiedCompanies = BuildVerifiedCompanies();
const unverifiedCompanies = BuildUnverifiedCompanies();
const verifyCompany = BuildVerifyCompany();
const rejectCompany = BuildRejectCompany(eventProducer);
const getJobs = BuildGetJobs();
const deleteJobs = BuildDeleteJobs();
const editJob = BuildEditJob();
const editCompany = BuildEditCompany();
const totalCount = BuildGetTotalCount();
const getGraphData = BuildGetGraphData();

export const adminControllers = {
  verifiedCompanies,
  unverifiedCompanies,
  verifyCompany,
  rejectCompany,
  getJobs,
  deleteJobs,
  editJob,
  editCompany,
  totalCount,
  getGraphData,
};

export type IAdminController = typeof adminControllers;
