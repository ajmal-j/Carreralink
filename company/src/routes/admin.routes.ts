import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { IAdminController } from "../controllers/admin/index.js";
import { IJobController } from "../controllers/jobs/index.js";

export function AdminRoutes(
  router: any,
  adminController: IAdminController,
  jobController: IJobController
) {
  router.use(VerifyAdmin);
  router.get(
    "/unverifiedCompanies",
    expressCallback(adminController.unverifiedCompanies)
  );

  router.get(
    "/verifiedCompanies",
    expressCallback(adminController.verifiedCompanies)
  );

  router.post("/verifyCompany", expressCallback(adminController.verifyCompany));

  router.delete(
    "/rejectCompany",
    expressCallback(adminController.rejectCompany)
  );

  router.post("/addCategories", expressCallback(adminController.addCategory));
  router.post("/addSkills", expressCallback(adminController.addSkills));

  router.delete(
    "/removeCategory",
    expressCallback(adminController.removeCategory)
  );
  router.delete("/removeSkill", expressCallback(adminController.removeSkill));
  router.get("/jobs", expressCallback(adminController.getJobs));
  router.delete("/deleteJobs", expressCallback(adminController.deleteJobs));
  router.post("/editJob", expressCallback(adminController.editJob));
  return router;
}
