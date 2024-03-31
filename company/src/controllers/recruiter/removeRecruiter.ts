import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import {
    removeRecruiterUsecase
} from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { id } = req.body;
    if (!id) throw new NotFoundError("Request id not found");
    await removeRecruiterUsecase.execute({ id });

    return new CustomResponse()
      .message("Removed Recruiter")
      .statusCode(200)
      .response();
  };
}
