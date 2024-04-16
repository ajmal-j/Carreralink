import { IInterviewController } from "../controllers/interview/index.js";
import { VerifyUser, expressCallback } from "@carreralink/common";

export function InterviewRoutes({
  interviewController,
  router,
}: {
  router: any;
  interviewController: IInterviewController;
}): any {
  router.post(
    "/create",
    VerifyUser,
    expressCallback(interviewController.create)
  );
  return router;
}
