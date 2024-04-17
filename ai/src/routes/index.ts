import { Router } from "express";
import { aiRoutes } from "./ai.routes.js";

const ai = Router();

const AiRoutes = aiRoutes({ router: ai });

export { AiRoutes };
