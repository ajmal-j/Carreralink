import {
  VerifyCompany,
  VerifyUser,
  expressCallback,
} from "@carreralink/common";
import { IJobController } from "../controllers/jobs/index.js";

export function JobRoutes(router: any, jobController: IJobController) {
  router.post("/create", VerifyCompany, expressCallback(jobController.create));
  router.post(
    "/createJobByRecruiter",
    VerifyUser,
    expressCallback(jobController.createJobByRecruiter)
  );
  router.get("/job", expressCallback(jobController.getJobById));
  router.get("/allJobs", expressCallback(jobController.allJobs));
  router.get("/allCompanyJobs", expressCallback(jobController.allCompanyJobs));
  router.get("/allLocations", expressCallback(jobController.allLocations));
  router.post("/saveJob", VerifyUser, expressCallback(jobController.saveJob));
  router.get(
    "/getSavedJobs",
    VerifyUser,
    expressCallback(jobController.getAllSavedJobs)
  );
  router.delete(
    "/removeSavedJob",
    VerifyUser,
    expressCallback(jobController.removeSavedJob)
  );
  router.get("/isSaved", VerifyUser, expressCallback(jobController.isSaved));
  return router;
}
