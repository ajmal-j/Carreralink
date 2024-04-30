import { Request } from "express";
import { PlanUsecase } from "../../usecases/plan/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const { id } = req.query;
    if (!id) throw new Error("Plan id not found");
    const plan = await PlanUsecase.get.execute(id as string);
    return new CustomResponse()
      .data(plan)
      .statusCode(200)
      .message("Plan")
      .response();
  };
}
