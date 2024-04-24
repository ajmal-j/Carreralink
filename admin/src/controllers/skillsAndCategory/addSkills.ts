import { CustomResponse } from "@carreralink/common";
import { SkillAndCategoryUsecase } from "../../usecases/skillAndCategory/index.js";

export default function () {
  return async (req: any) => {
    const { skills } = req.body;
    if (!skills) throw new Error("Skills not found");
    await SkillAndCategoryUsecase.addSkills.execute(skills);
    return new CustomResponse()
      .statusCode(200)
      .message("Skills added")
      .response();
  };
}
