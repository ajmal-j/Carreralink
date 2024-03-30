import { VerifyUser, expressCallback } from "@carreralink/common";
import { IRecruiterController } from "../controllers/recruiter/index.js";

export function RecruiterRoutes({
  router,
  recruiterController,
}: {
  router: any;
  recruiterController: IRecruiterController;
}) {
  router.post(
    "/create",
    VerifyUser,
    expressCallback(recruiterController.create)
  );

  router.get(
    "/isRecruiter",
    VerifyUser,
    expressCallback(recruiterController.isRecruiter)
  );
  
  return router;
}
