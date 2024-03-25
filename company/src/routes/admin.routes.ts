import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { IAdminController } from "../controllers/admin/index.js";

export function AdminRoutes(router: any, adminController: IAdminController) {
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
  router.get(
    "/getSkillsAndCategories",
    expressCallback(adminController.getSkillsAndCategories)
  );
  router.delete(
    "/removeCategory",
    expressCallback(adminController.removeCategory)
  );
  router.delete("/removeSkill", expressCallback(adminController.removeSkill));
  return router;
}
