import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { PlanUsecase } from "../../usecases/plan/index.js";
import { IPlan } from "../../database/models/plan.model.js";

export default function () {
  return async (req: Request) => {
    const data = req.body;
    if (!data) throw new BadRequestError("Data not found");

    await PlanUsecase.create.execute(data as IPlan);

    return new CustomResponse()
      .statusCode(201)
      .message("Plan created")
      .response();
  };
}
