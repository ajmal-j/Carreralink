import { expressCallback } from "@carreralink/common";
import { ICompilerController } from "../controllers/index.js";

export function CompilerRoutes({
  router,
  compilerController,
}: {
  router: any;
  compilerController: ICompilerController;
}) {
  router.post("/compile", expressCallback(compilerController.compile));

  return router;
}
