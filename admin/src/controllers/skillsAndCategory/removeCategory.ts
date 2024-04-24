import { CustomResponse } from "@carreralink/common";
import { SkillAndCategoryUsecase } from "../../usecases/skillAndCategory/index.js";

export default function () {
  return async (req: any) => {
    const { category } = req.body;
    if (!category) throw new Error("Skills not found");
    await SkillAndCategoryUsecase.removeCategory.execute(category);
    return new CustomResponse()
      .statusCode(200)
      .message("Skill removed")
      .response();
  };
}
