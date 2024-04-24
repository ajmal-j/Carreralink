import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { IAdminController } from "../controllers/admin/index.js";
import { IJobController } from "../controllers/jobs/index.js";

export function AdminRoutes({
  router,
  adminControllers,
  jobController,
  updateLogoOrImageOfCEO,
}: {
  router: any;
  adminControllers: IAdminController;
  updateLogoOrImageOfCEO: any;
  jobController: IJobController;
}) {
  router.use(VerifyAdmin);
  router.get(
    "/unverifiedCompanies",
    expressCallback(adminControllers.unverifiedCompanies)
  );

  router.get(
    "/verifiedCompanies",
    expressCallback(adminControllers.verifiedCompanies)
  );

  router.post(
    "/verifyCompany",
    expressCallback(adminControllers.verifyCompany)
  );

  router.delete(
    "/rejectCompany",
    expressCallback(adminControllers.rejectCompany)
  );

  router.get("/jobs", expressCallback(adminControllers.getJobs));
  router.delete("/deleteJobs", expressCallback(adminControllers.deleteJobs));
  router.post("/editJob", expressCallback(adminControllers.editJob));
  router.post(
    "/editCompany",
    updateLogoOrImageOfCEO,
    expressCallback(adminControllers.editCompany)
  );
  router.get("/totalCounts", expressCallback(adminControllers.totalCount));
  router.get("/graphData", expressCallback(adminControllers.getGraphData));
  return router;
}
