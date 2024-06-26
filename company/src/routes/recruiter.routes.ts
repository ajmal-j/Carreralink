import { VerifyUser, expressCallback } from "@carreralink/common";
import { IRecruiterController } from "../controllers/recruiter/index.js";
import { IJobController } from "../controllers/jobs/index.js";

export function RecruiterRoutes({
  router,
  recruiterController,
  jobController,
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
  router.get(
    "/totalCounts",
    VerifyUser,
    expressCallback(recruiterController.getTotalCount)
  );
  router.get(
    "/graphData",
    VerifyUser,
    expressCallback(recruiterController.getGraphData)
  );
  router.patch(
    "/updateApplicantStatus",
    VerifyUser,
    expressCallback(recruiterController.updateApplicantStatus)
  );
  router.patch(
    "/updateJobStatus",
    VerifyUser,
    expressCallback(jobController.updateStatusByRecruiter)
  );
  return router;
}
