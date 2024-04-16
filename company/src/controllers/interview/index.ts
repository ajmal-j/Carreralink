import BuildCreateInterviewController from "./create.js";
import BuildGetByUserInterviewController from "./getByUser.js";
import BuildCancelInterviewController from "./cancel.js";
import BuildGetByRecruiterInterviewController from "./getByRecruiter.js";
import BuildUpdateInterviewController from "./update.js";

const create = BuildCreateInterviewController();
const getByUser = BuildGetByUserInterviewController();
const cancel = BuildCancelInterviewController();
const getByRecruiter = BuildGetByRecruiterInterviewController();
const update = BuildUpdateInterviewController();

export const interviewControllers = {
  create,
  getByUser,
  cancel,
  getByRecruiter,
  update,
};

export type IInterviewController = typeof interviewControllers;
