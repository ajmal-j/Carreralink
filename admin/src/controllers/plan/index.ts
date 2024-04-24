import BuildCreatePlan from "./create.js";
import BuildGetUserPlans from "./userPlans.js";
import BuildGetCompanyPlans from "./companyPlans.js";
import BuildUpdatePlan from "./update.js";

const create = BuildCreatePlan();
const update = BuildUpdatePlan();
const userPlans = BuildGetUserPlans();
const companyPlans = BuildGetCompanyPlans();

export const planControllers = {
  create,
  userPlans,
  companyPlans,
  update,
};

export type IPlanControllers = typeof planControllers;
