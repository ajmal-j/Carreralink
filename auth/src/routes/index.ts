import { Router } from "express";
import buildAuthRouter from "./auth.routes.js";
import { authControllers } from "../controller/user/index.js";
import { companyControllers } from "../controller/company/index.js";
import { adminController } from "../controller/admin/index.js";

let router = Router();

router = buildAuthRouter(
  router,
  authControllers,
  companyControllers,
  adminController
);

export default router;
