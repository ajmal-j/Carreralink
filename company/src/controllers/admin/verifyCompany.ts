import { Request } from "express";
import { verifyCompanyUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const { id } = req.query;
    if (!id) throw new Error("Company id not found");
    await verifyCompanyUsecase.execute(id as string);
    return new CustomResponse()
      .statusCode(200)
      .message("Company Verified")
      .response();
  };
}
