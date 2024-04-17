import { expressCallback } from "@carreralink/common";
import { IAiController } from "../controllers/index.js";

export function aiRoutes({
  router,
  aiController,
}: {
  router: any;
  aiController: IAiController;
}) {
  router.post("/validateResume", expressCallback(aiController.validateResume));
  return router;
}
