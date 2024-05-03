import { Router } from "express";
import { CompilerRoutes } from "./compiler.routes.js";
import { compilerController } from "../controllers/index.js";
const compiler = Router();

const compilerRoutes = CompilerRoutes({
  router: compiler,
  compilerController,
});

export { compilerRoutes };
