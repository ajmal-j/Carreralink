import { Router } from "express";
import { aiRoutes } from "./ai.routes.js";
import { aiController } from "../controllers/index.js";

const ai = Router();

const AiRoutes = aiRoutes({ router: ai, aiController });

export { AiRoutes };
