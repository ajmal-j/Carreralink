import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { rejectRequestUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { id } = req.body;
    if (!id) throw new NotFoundError("Request id not found");
    await rejectRequestUsecase.execute({ id });

    return new CustomResponse()
      .message("Request Rejected")
      .statusCode(200)
      .response();
  };
}
