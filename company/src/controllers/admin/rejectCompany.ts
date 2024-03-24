import { Request } from "express";
import { rejectCompanyUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const { id } = req.query;
    if (!id) throw new Error("Company id not found");
    await rejectCompanyUsecase.execute(id as string);

    return new CustomResponse()
      .statusCode(200)
      .message("Rejected Company.")
      .response();
  };
}
