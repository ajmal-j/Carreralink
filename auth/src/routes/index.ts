import { Router } from "express";
import buildAuthRouter from "./auth.routes.js";
import { authControllers } from "../controller/user/index.js";
import { companyControllers } from "../controller/company/index.js";

let router = Router();

router = buildAuthRouter(router, authControllers,companyControllers);

export default router;
