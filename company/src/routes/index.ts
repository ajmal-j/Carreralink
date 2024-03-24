import { Router } from "express";
import { CompanyRoutes } from "./company.routes.js";
import { companyController } from "../controllers/company/index.js";
import { JobRoutes } from "./job.routes.js";
import { jobController } from "../controllers/jobs/index.js";
import { AdminRoutes } from "./admin.routes.js";
import { adminControllers } from "../controllers/admin/index.js";

const company = Router();
const jobs = Router();
const admin = Router();

const companyRoutes = CompanyRoutes(company, companyController, jobController);
const jobsRoutes = JobRoutes(jobs, jobController);
const adminRoutes = AdminRoutes(admin, adminControllers);

export { companyRoutes, jobsRoutes, adminRoutes };
