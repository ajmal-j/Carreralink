import BuildCreateInterviewController from "./create.js";
import BuildGetByUserInterviewController from "./getByUser.js";
import BuildCancelInterviewController from "./cancel.js";

const create = BuildCreateInterviewController();
const getByUser = BuildGetByUserInterviewController();
const cancel = BuildCancelInterviewController();

export const interviewControllers = {
  create,
  getByUser,
  cancel,
};

export type IInterviewController = typeof interviewControllers;
