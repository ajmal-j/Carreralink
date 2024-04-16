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
  router.get(
    "/getByUser",
    VerifyUser,
    expressCallback(interviewController.getByUser)
  );
  router.patch(
    "/cancel",
    VerifyUser,
    expressCallback(interviewController.cancel)
  );
  return router;
}
