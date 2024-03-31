import BuildCreateRequest from "./createRequest.js";
import BuildIsRecruiter from "./isRecruiter.js";
import BuildGetRecruiters from "./recruiters.js";
import BuildGetPendingRequests from "./pendingRequests.js";
import BuildAssignRecruiter from "./assignRecruiter.js";
import BuildRejectRequest from "./rejectRequest.js";
import BuildRemoveRecruiter from "./removeRecruiter.js";

const create = BuildCreateRequest();
const isRecruiter = BuildIsRecruiter();
const recruiters = BuildGetRecruiters();
const pendingRequests = BuildGetPendingRequests();
const assignRecruiter = BuildAssignRecruiter();
const rejectRequest = BuildRejectRequest();
const removeRecruiter = BuildRemoveRecruiter();

export const recruiterController = {
  create,
  isRecruiter,
  recruiters,
  pendingRequests,
  assignRecruiter,
  rejectRequest,
  removeRecruiter,
};
export type IRecruiterController = typeof recruiterController;
