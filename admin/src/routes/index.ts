import { Router } from "express";
import { AdminRoutes } from "./admin.routes.js";
import { adminControllers } from "../controllers/admin/index.js";

const admin = Router();

const adminRoutes = AdminRoutes({
  router: admin,
  adminControllers,
});

export { adminRoutes };
