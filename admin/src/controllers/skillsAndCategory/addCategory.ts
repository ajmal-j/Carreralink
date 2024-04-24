import { CustomResponse } from "@carreralink/common";
import { SkillAndCategoryUsecase } from "../../usecases/skillAndCategory/index.js";

export default function () {
  return async (req: any) => {
    const { categories } = req.body;
    if (!categories) throw new Error("category not found");
    await SkillAndCategoryUsecase.addCategory.execute(categories);
    return new CustomResponse()
      .statusCode(200)
      .message("Categories added")
      .response();
  };
}
