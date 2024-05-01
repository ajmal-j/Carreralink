import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { ISkillAndCategoryControllers } from "../controllers/skillsAndCategory/index.js";

export function SkillAndCategoryRoutes({
  router,
  skillAndCategoryControllers,
}: {
  router: any;
  skillAndCategoryControllers: ISkillAndCategoryControllers;
}) {
  router.post(
    "/addCategories",
    VerifyAdmin,
    expressCallback(skillAndCategoryControllers.addCategory)
  );
  router.post(
    "/addSkills",
    VerifyAdmin,
    expressCallback(skillAndCategoryControllers.addSkills)
  );
  router.delete(
    "/removeCategory",
    VerifyAdmin,
    expressCallback(skillAndCategoryControllers.removeCategory)
  );
  router.get(
    "/getSkillsAndCategories",
    expressCallback(skillAndCategoryControllers.getSkillsAndCategories)
  );
  router.delete(
    "/removeSkill",
    VerifyAdmin,
    expressCallback(skillAndCategoryControllers.removeSkill)
  );
  return router;
}
