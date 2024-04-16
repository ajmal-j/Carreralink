import BuildCreateInterviewController from "./create.js";
import BuildGetByUserInterviewController from "./getByUser.js";
import BuildCancelInterviewController from "./cancel.js";
import BuildGetByRecruiterInterviewController from "./getByRecruiter.js";

const create = BuildCreateInterviewController();
const getByUser = BuildGetByUserInterviewController();
const cancel = BuildCancelInterviewController();
const getByRecruiter = BuildGetByRecruiterInterviewController();

export const interviewControllers = {
  create,
  getByUser,
  cancel,
  getByRecruiter,
};

export type IInterviewController = typeof interviewControllers;
