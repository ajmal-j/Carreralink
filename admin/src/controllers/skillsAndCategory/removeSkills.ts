import { CustomResponse } from "@carreralink/common";
import { SkillAndCategoryUsecase } from "../../usecases/skillAndCategory/index.js";

export default function () {
  return async (req: any) => {
    const { skill } = req.body;
    if (!skill) throw new Error("Skills not found");
    await SkillAndCategoryUsecase.removeSkill.execute(skill);
    return new CustomResponse()
      .statusCode(200)
      .message("Skill removed")
      .response();
  };
}
