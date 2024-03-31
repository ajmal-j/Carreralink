import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { assignRecruiterUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { id } = req.body;
    if (!id) throw new NotFoundError("Request id not found");
    await assignRecruiterUsecase.execute({ id });

    return new CustomResponse()
      .message("Recruiter Assigned")
      .statusCode(200)
      .response();
  };
}
