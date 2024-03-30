import BuildCreateRequest from "./createRequest.js";
import BuildIsRecruiter from "./isRecruiter.js";

const create = BuildCreateRequest();
const isRecruiter = BuildIsRecruiter();

export const recruiterController = {
  create,
  isRecruiter,
};
export type IRecruiterController = typeof recruiterController;
