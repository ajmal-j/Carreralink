import BuildCreatePlan from "./create.js";
import BuildGetUserPlans from "./userPlans.js";
import BuildGetCompanyPlans from "./companyPlans.js";
import BuildUpdatePlan from "./update.js";
import BuildGetPlan from "./plan.js";

const create = BuildCreatePlan();
const update = BuildUpdatePlan();
const userPlans = BuildGetUserPlans();
const companyPlans = BuildGetCompanyPlans();
const getPlan = BuildGetPlan();

export const planControllers = {
  create,
  userPlans,
  companyPlans,
  update,
  getPlan,
};

export type IPlanControllers = typeof planControllers;
