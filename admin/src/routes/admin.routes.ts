import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { IAdminController } from "../controllers/admin/index.js";

export function AdminRoutes({
  router,
  adminControllers,
}: {
  router: any;
  adminControllers: IAdminController;
}) {
  router.use(VerifyAdmin);

  router.post("/addCategories", expressCallback(adminControllers.addCategory));
  router.post("/addSkills", expressCallback(adminControllers.addSkills));
  router.delete(
    "/removeCategory",
    expressCallback(adminControllers.removeCategory)
  );
  router.get(
    "/getSkillsAndCategories",
    expressCallback(adminControllers.getSkillsAndCategories)
  );
  router.delete("/removeSkill", expressCallback(adminControllers.removeSkill));
  return router;
}
