import { Router } from "express";
import { CompanyRoutes } from "./company.routes.js";
import { companyController } from "../controllers/company/index.js";
import { JobRoutes } from "./job.routes.js";
import { jobController } from "../controllers/jobs/index.js";
import { AdminRoutes } from "./admin.routes.js";
import { adminControllers } from "../controllers/admin/index.js";
import { upload } from "../middleware/uploadImage.js";
import { RecruiterRoutes } from "./recruiter.routes.js";
import { recruiterController } from "../controllers/recruiter/index.js";

const company = Router();
const jobs = Router();
const admin = Router();
const recruiter = Router();

const companyRoutes = CompanyRoutes({
  router: company,
  companyController,
  jobController,
  updateCoverPhoto: upload.single("coverPhoto"),
  updateLogoOrImageOfCEO: upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "imageOfCEO", maxCount: 1 },
  ]),
  recruiterController,
});

const jobsRoutes = JobRoutes(jobs, jobController);

const recruiterRoutes = RecruiterRoutes({
  router: recruiter,
  recruiterController,
});

const adminRoutes = AdminRoutes({
  router: admin,
  adminControllers,
  jobController,
  updateLogoOrImageOfCEO: upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "imageOfCEO", maxCount: 1 },
  ]),
});

export { companyRoutes, jobsRoutes, adminRoutes, recruiterRoutes };
