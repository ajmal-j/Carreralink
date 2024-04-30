import { VerifyUser, expressCallback } from "@carreralink/common";
import { IPlanControllers } from "../controllers/plan/index.js";

export function UserPlanRoutes({
  router,
  planControllers,
}: {
  router: any;
  planControllers: IPlanControllers;
}) {
  router.use(VerifyUser);

  router.get("/plan", expressCallback(planControllers.getPlan));
  return router;
}
