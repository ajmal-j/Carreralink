import { Router } from "express";
import BuildUserRoutes from "./user.routes.js";
import { userController } from "../controllers/index.js";

const router = Router();

const routes = BuildUserRoutes(router, userController);

export default routes;
