import { Router } from "express";
import { SkillAndCategoryRoutes } from "./skillAndCategory.routes.js";
import { skillAndCategoryControllers } from "../controllers/skillsAndCategory/index.js";
import { planControllers } from "../controllers/plan/index.js";
import { PlanRoutes } from "./plan.routes.js";

const skillAndCategory = Router();
const plan = Router();

const skillAndCategoryRoutes = SkillAndCategoryRoutes({
  router: skillAndCategory,
  skillAndCategoryControllers,
});

const planRoutes = PlanRoutes({
  router: plan,
  planControllers,
});

export { skillAndCategoryRoutes, planRoutes };
