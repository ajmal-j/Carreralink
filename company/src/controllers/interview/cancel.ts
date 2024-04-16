import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { InterviewUsecase } from "../../usecases/interview/index.js";

export default function () {
  return async (req: Request) => {
    const { interview, reason, cancelledBy } = req.body;

    if (!interview) throw new NotFoundError("Interview id not found");
    if (!reason) throw new NotFoundError("Reason not found");
    if (!cancelledBy) throw new NotFoundError("Invalid Data");

    await InterviewUsecase.cancel.execute({
      interview,
      reason,
      cancelledBy,
    });
    
    return new CustomResponse()
      .statusCode(200)
      .message("Interview Cancelled")
      .response();
  };
}
