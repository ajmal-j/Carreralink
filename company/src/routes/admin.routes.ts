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
  return router;
}
