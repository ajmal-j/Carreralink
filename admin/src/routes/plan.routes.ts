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

  return router;
}
