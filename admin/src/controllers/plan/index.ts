import BuildCreatePlan from "./create.js";

const create = BuildCreatePlan();

export const planControllers = {
  create,
};

export type IPlanControllers = typeof planControllers;
