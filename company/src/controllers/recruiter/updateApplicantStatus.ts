import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { updateApplicantStatusUsecase } from "../../usecases/index.js";
import { JobUsecase } from "../../usecases/jobs/index.js";

export default function () {
  return async (req: Request) => {
    const { user, job, status, interview } = req.body;
    if (!user) throw new NotFoundError("User not found");
    if (!job) throw new NotFoundError("Job not found");
    if (!status) throw new NotFoundError("Status not found");
    if (status === "interview") {
      if (!interview) throw new NotFoundError("Interview data not found");
    } else
      await updateApplicantStatusUsecase.execute({
        user,
        job,
        status,
      });

    if (status === "hired") {
      await JobUsecase.hiredOneUsecase.execute({
        id: job,
      });
    }
    return new CustomResponse()
      .message("Status updated")
      .statusCode(200)
      .response();
  };
}
