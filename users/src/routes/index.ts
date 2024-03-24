import { Router } from "express";
import BuildUserRoutes from "./user.routes.js";
import { userController } from "../controllers/index.js";
import { upload } from "../middlewares/uploadImage.js";
import BuildAdminRoutes from "./admin.routes.js";

let userRouter = Router();
let adminRouter = Router();

userRouter = BuildUserRoutes(
  userRouter,
  userController,
  upload.single("profile")
);

adminRouter = BuildAdminRoutes(adminRouter);

export { userRouter, adminRouter };
