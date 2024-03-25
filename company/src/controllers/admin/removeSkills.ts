import { CustomResponse } from "@carreralink/common";
import { removeSkillUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: any) => {
    const { skill } = req.body;
    if (!skill) throw new Error("Skills not found");
    await removeSkillUsecase.execute(skill);
    return new CustomResponse()
      .statusCode(200)
      .message("Skill removed")
      .response();
  };
}
