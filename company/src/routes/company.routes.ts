import { VerifyCompany, expressCallback } from "@carreralink/common";
import { ICompanyController } from "../controllers/company/index.js";
import { IJobController } from "../controllers/jobs/index.js";
import { IRecruiterController } from "../controllers/recruiter/index.js";

export function CompanyRoutes({
  router,
  companyController,
  updateLogoOrImageOfCEO,
  jobController,
  updateCoverPhoto,
  recruiterController,
}: {
  router: any;
  companyController: ICompanyController;
  updateLogoOrImageOfCEO: any;
  jobController: IJobController;
  updateCoverPhoto: any;
  recruiterController: IRecruiterController;
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
  router.get(
    "/getRecruiter",
    VerifyCompany,
    expressCallback(recruiterController.recruiters)
  );
  router.get(
    "/getPendingRequests",
    VerifyCompany,
    expressCallback(recruiterController.pendingRequests)
  );
  router.put(
    "/assignRecruiter",
    VerifyCompany,
    expressCallback(recruiterController.assignRecruiter)
  );
  router.put(
    "/rejectRequest",
    VerifyCompany,
    expressCallback(recruiterController.rejectRequest)
  );
  router.delete(
    "/removeRecruiter",
    VerifyCompany,
    expressCallback(recruiterController.removeRecruiter)
  );
  return router;
}
