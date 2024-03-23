import { Router } from "express";
import BuildUserRoutes from "./user.routes.js";
import { userController } from "../controllers/index.js";
import { upload } from "../middlewares/uploadImage.js";

const router = Router();

const routes = BuildUserRoutes(
  router,
  userController,
  upload.single("profile")
);

export default routes;
