import { VerifyUser, expressCallback } from "@carreralink/common";
import { IRecruiterController } from "../controllers/recruiter/index.js";
import { IJobController } from "../controllers/jobs/index.js";

export function RecruiterRoutes({
  router,
  recruiterController,
  jobController
}: {
  router: any;
  recruiterController: IRecruiterController;
  jobController: IJobController;
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
  router.get(
    "/getJobs",
    VerifyUser,
    expressCallback(recruiterController.getJobs)
  );
  router.put(
    "/updateJob",
    VerifyUser,
    expressCallback(jobController.updateJob)
  );
  return router;
}
