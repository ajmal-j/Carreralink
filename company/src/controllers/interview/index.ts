import BuildCreateInterviewController from "./create.js";
import BuildGetByUserInterviewController from "./getByUser.js";
import BuildCancelInterviewController from "./cancel.js";
import BuildGetByRecruiterInterviewController from "./getByRecruiter.js";
import BuildUpdateInterviewController from "./update.js";
import BuildJoinInterviewController from "./join.js";
import BuildUpdateStatusInterviewController from "./updateStatus.js";

const create = BuildCreateInterviewController();
const getByUser = BuildGetByUserInterviewController();
const cancel = BuildCancelInterviewController();
const getByRecruiter = BuildGetByRecruiterInterviewController();
const update = BuildUpdateInterviewController();
const join = BuildJoinInterviewController();
const updateStatus = BuildUpdateStatusInterviewController();

export const interviewControllers = {
  create,
  getByUser,
  cancel,
  getByRecruiter,
  update,
  join,
  updateStatus,
};

export type IInterviewController = typeof interviewControllers;
