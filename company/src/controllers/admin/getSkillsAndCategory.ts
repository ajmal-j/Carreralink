import { Request } from "express";
import { getSkillsAndCategory } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const data = await getSkillsAndCategory.execute();
    return new CustomResponse()
      .data(data)
      .message("All Skills and Categories.")
      .statusCode(200)
      .response();
  };
}
