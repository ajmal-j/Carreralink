import { Router } from "express";
import buildAuthRouter from "./auth.routes.js";
import { authControllers } from "../controller/index.js";

let router = Router();

router = buildAuthRouter(router, authControllers);

export default router;
