import { Request } from "express";
import { CustomResponse } from "@carreralink/common";
import { getTotalCountByAdminUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const count = await getTotalCountByAdminUsecase.execute();
    return new CustomResponse()
      .data(count)
      .message("Total Counts.")
      .statusCode(200)
      .response();
  };
}
