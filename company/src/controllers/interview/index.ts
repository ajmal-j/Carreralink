import BuildCreateInterviewController from "./create.js";
import BuildGetByUserInterviewController from "./getByUser.js";
import BuildCancelInterviewController from "./cancel.js";
import BuildGetByRecruiterInterviewController from "./getByRecruiter.js";
import BuildUpdateInterviewController from "./update.js";
import BuildJoinInterviewController from "./join.js";

const create = BuildCreateInterviewController();
const getByUser = BuildGetByUserInterviewController();
const cancel = BuildCancelInterviewController();
const getByRecruiter = BuildGetByRecruiterInterviewController();
const update = BuildUpdateInterviewController();
const join = BuildJoinInterviewController();

export const interviewControllers = {
  create,
  getByUser,
  cancel,
  getByRecruiter,
  update,
  join,
};

export type IInterviewController = typeof interviewControllers;
