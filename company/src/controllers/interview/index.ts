import BuildCreateInterviewController from "./create.js";

const create = BuildCreateInterviewController();

export const interviewControllers = {
  create,
};

export type IInterviewController = typeof interviewControllers;
