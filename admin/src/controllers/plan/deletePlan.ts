import { BadRequestError, CustomResponse } from "@carreralink/common";
import { PlanUsecase } from "../../usecases/plan/index.js";
import { Request } from "express";

export default function () {
  return async (req: Request) => {
    const { id } = req.body;
    if (!id) throw new BadRequestError("Plan id not found");
    await PlanUsecase.deletePlan.execute({ id: id as string });
    return new CustomResponse()
      .statusCode(200)
      .message("Plan deleted")
      .response();
  };
}
