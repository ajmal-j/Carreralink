import { VerifyCompany, expressCallback } from "@carreralink/common";
import { IJobController } from "../controllers/jobs/index.js";

export function JobRoutes(router: any, jobController: IJobController) {
  router.post("/create", VerifyCompany, expressCallback(jobController.create));
  router.get("/job", expressCallback(jobController.getJobById));
  router.get("/allJobs", expressCallback(jobController.allJobs));
  router.get("/allCompanyJobs", expressCallback(jobController.allCompanyJobs));
  router.get('/allLocations', expressCallback(jobController.allLocations));
  return router;
}
