import { Request } from "express";
import { PlanUsecase } from "../../usecases/plan/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const data = await PlanUsecase.companyPlans.execute();
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("Company Plans")
      .response();
  };
}
