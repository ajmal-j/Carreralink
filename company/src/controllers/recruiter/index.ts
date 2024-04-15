import BuildCreateRequest from "./createRequest.js";
import BuildIsRecruiter from "./isRecruiter.js";
import BuildGetRecruiters from "./recruiters.js";
import BuildGetPendingRequests from "./pendingRequests.js";
import BuildAssignRecruiter from "./assignRecruiter.js";
import BuildRejectRequest from "./rejectRequest.js";
import BuildRemoveRecruiter from "./removeRecruiter.js";
import BuildGetJobs from "./getJobs.js";
import BuildGetTotalCount from "./getTotalCount.js";
import BuildGetGraphData from "./getGraphData.js";

const create = BuildCreateRequest();
const isRecruiter = BuildIsRecruiter();
const recruiters = BuildGetRecruiters();
const pendingRequests = BuildGetPendingRequests();
const assignRecruiter = BuildAssignRecruiter();
const rejectRequest = BuildRejectRequest();
const removeRecruiter = BuildRemoveRecruiter();
const getJobs = BuildGetJobs();
const getTotalCount = BuildGetTotalCount();
const getGraphData = BuildGetGraphData();

export const recruiterController = {
  create,
  isRecruiter,
  recruiters,
  pendingRequests,
  assignRecruiter,
  rejectRequest,
  removeRecruiter,
  getJobs,
  getTotalCount,
  getGraphData,
};
export type IRecruiterController = typeof recruiterController;
