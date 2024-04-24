import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { PlanUsecase } from "../../usecases/plan/index.js";

export default function () {
  return async (req: Request) => {
    const { id, ...data } = req.body;
    if (!data || !id) throw new BadRequestError("Data not found");
    const updated = await PlanUsecase.update.execute({ data, plan: id });
    return new CustomResponse()
      .statusCode(200)
      .data(updated)
      .message("Plan updated")
      .response();
  };
}
