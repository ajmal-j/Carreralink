import { Router } from "express";
import BuildUserRoutes from "./user.routes.js";
import { userController } from "../controllers/user/index.js";
import { upload } from "../middlewares/uploadImage.js";
import BuildAdminRoutes from "./admin.routes.js";
import { adminController } from "../controllers/admin/index.js";

let userRouter = Router();
let adminRouter = Router();

userRouter = BuildUserRoutes(
  userRouter,
  userController,
  upload.single("profile")
);

adminRouter = BuildAdminRoutes(adminRouter, adminController);

export { userRouter, adminRouter };
