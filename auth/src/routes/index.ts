import { Router } from "express";
import buildAuthRouter from "./auth.routes";
import { authControllers } from "../controller";

let router = Router();

router = buildAuthRouter(router, authControllers);

export default router;
