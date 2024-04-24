import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { IPlanControllers } from "../controllers/plan/index.js";

export function PlanRoutes({
  router,
  planControllers,
}: {
  router: any;
  planControllers: IPlanControllers;
}) {
  router.use(VerifyAdmin);

  router.post("/create", expressCallback(planControllers.create));
  router.get("/userPlans", expressCallback(planControllers.userPlans));
  router.get("/companyPlans", expressCallback(planControllers.companyPlans));
  return router;
}
