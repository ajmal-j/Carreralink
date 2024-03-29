import { ICompanyController } from "../controllers/company/index.js";
import {
  VerifyAdmin,
  VerifyCompany,
  expressCallback,
} from "@carreralink/common";
import { IJobController } from "../controllers/jobs/index.js";

export function CompanyRoutes({
  router,
  companyController,
  updateLogoOrImageOfCEO,
  jobController,
  updateCoverPhoto,
}: {
  router: any;
  companyController: ICompanyController;
  updateLogoOrImageOfCEO: any;
  jobController: IJobController;
  updateCoverPhoto: any;
}) {
  router.get("/all", expressCallback(companyController.allCompanies));

  router.get("/get", expressCallback(companyController.get));

  router.get(
    "/isVerified",
    VerifyCompany,
    expressCallback(companyController.isVerified)
  );

  router.get("/data", VerifyCompany, expressCallback(companyController.data));

  router.put(
    "/update",
    VerifyCompany,
    updateLogoOrImageOfCEO,
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
  router.get(
    "/getSkillsAndCategories",
    expressCallback(companyController.getSkillsAndCategories)
  );

  router.get("/jobs", VerifyCompany, expressCallback(companyController.jobs));

  router.get("/companyList", expressCallback(companyController.companyList));

  router.put(
    "/updateCoverPhoto",
    VerifyCompany,
    updateCoverPhoto,
    expressCallback(companyController.updateCoverPhoto)
  );

  return router;
}
