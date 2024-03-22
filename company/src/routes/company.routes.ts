import { ICompanyController } from "../controllers/company/index.js";
import { VerifyCompany, expressCallback } from "@carreralink/common";
import { IJobController } from "../controllers/jobs/index.js";

export function CompanyRoutes(
  router: any,
  companyController: ICompanyController,
  jobController: IJobController
) {
  router.get("/all", expressCallback(companyController.allCompanies));
  router.get("/get", expressCallback(companyController.get));
  router.get("/data", VerifyCompany, expressCallback(companyController.data));
  router.put(
    "/update",
    VerifyCompany,
    expressCallback(companyController.update)
  );
  router.get(
    "/allJobs",
    VerifyCompany,
    expressCallback(companyController.allJobs)
  );
  router.put(
    "/updateJob",
    VerifyCompany,
    expressCallback(jobController.updateJob)
  );
  return router;
}
