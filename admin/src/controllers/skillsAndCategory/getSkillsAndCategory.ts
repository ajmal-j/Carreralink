import { Request } from "express";
import { CustomResponse } from "@carreralink/common";
import { SkillAndCategoryUsecase } from "../../usecases/skillAndCategory/index.js";

export default function () {
  return async (req: Request) => {
    const data = await SkillAndCategoryUsecase.getSkillsAndCategory.execute();
    return new CustomResponse()
      .data(data)
      .message("All Skills and Categories.")
      .statusCode(200)
      .response();
  };
}
