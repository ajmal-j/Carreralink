import BuildCreatePlan from "./create.js";
import BuildGetUserPlans from "./userPlans.js";
import BuildGetCompanyPlans from "./companyPlans.js";
import BuildUpdatePlan from "./update.js";
import BuildGetPlan from "./plan.js";
import BuildDeletePlan from "./deletePlan.js";

const create = BuildCreatePlan();
const update = BuildUpdatePlan();
const userPlans = BuildGetUserPlans();
const companyPlans = BuildGetCompanyPlans();
const getPlan = BuildGetPlan();
const deletePlan = BuildDeletePlan();

export const planControllers = {
  create,
  userPlans,
  companyPlans,
  update,
  getPlan,
  deletePlan,
};

export type IPlanControllers = typeof planControllers;
