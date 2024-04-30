import { Router } from "express";
import { SkillAndCategoryRoutes } from "./skillAndCategory.routes.js";
import { skillAndCategoryControllers } from "../controllers/skillsAndCategory/index.js";
import { planControllers } from "../controllers/plan/index.js";
import { AdminPlanRoutes } from "./plan-admin.routes.js";
import { UserPlanRoutes } from "./plan-user.routes.js";

const skillAndCategory = Router();
const adminPlan = Router();
const userPlan = Router();

const skillAndCategoryRoutes = SkillAndCategoryRoutes({
  router: skillAndCategory,
  skillAndCategoryControllers,
});

const adminPlanRoutes = AdminPlanRoutes({
  router: adminPlan,
  planControllers,
});
const userPlanRoutes = UserPlanRoutes({
  router: userPlan,
  planControllers,
});

export { skillAndCategoryRoutes, adminPlanRoutes, userPlanRoutes };
