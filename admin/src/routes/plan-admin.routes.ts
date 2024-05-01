import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { IPlanControllers } from "../controllers/plan/index.js";

export function AdminPlanRoutes({
  router,
  planControllers,
}: {
  router: any;
  planControllers: IPlanControllers;
}) {
  router.post("/create", VerifyAdmin, expressCallback(planControllers.create));
  router.get("/userPlans", expressCallback(planControllers.userPlans));
  router.get("/companyPlans", expressCallback(planControllers.companyPlans));
  router.patch("/update", VerifyAdmin, expressCallback(planControllers.update));
  return router;
}
