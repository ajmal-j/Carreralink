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
  router.get(
    "/getByRecruiter",
    VerifyUser,
    expressCallback(interviewController.getByRecruiter)
  );
  router.patch(
    "/cancel",
    VerifyUser,
    expressCallback(interviewController.cancel)
  );
  router.patch(
    "/update",
    VerifyUser,
    expressCallback(interviewController.update)
  );
  router.get("/join", VerifyUser, expressCallback(interviewController.join));
  return router;
}
