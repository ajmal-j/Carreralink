import { VerifyAdmin, expressCallback } from "@carreralink/common";
import { ISkillAndCategoryControllers } from "../controllers/skillsAndCategory/index.js";

export function SkillAndCategoryRoutes({
  router,
  skillAndCategoryControllers,
}: {
  router: any;
  skillAndCategoryControllers: ISkillAndCategoryControllers;
}) {
  router.use(VerifyAdmin);

  router.post(
    "/addCategories",
    expressCallback(skillAndCategoryControllers.addCategory)
  );
  router.post(
    "/addSkills",
    expressCallback(skillAndCategoryControllers.addSkills)
  );
  router.delete(
    "/removeCategory",
    expressCallback(skillAndCategoryControllers.removeCategory)
  );
  router.get(
    "/getSkillsAndCategories",
    expressCallback(skillAndCategoryControllers.getSkillsAndCategories)
  );
  router.delete(
    "/removeSkill",
    expressCallback(skillAndCategoryControllers.removeSkill)
  );
  return router;
}
