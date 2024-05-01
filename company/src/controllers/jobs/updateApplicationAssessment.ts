import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { JobUsecase } from "../../usecases/jobs/index.js";

export default function () {
  return async (req: Request) => {
    const { assessments, job } = req.body;
    const userData = req?.user;
    if (!assessments) throw new BadRequestError("Assessments not found");
    if (!job) throw new BadRequestError("Job not found");
    if (!userData?.email) throw new BadRequestError("User not authenticated");

    await JobUsecase.updateApplicationAssessment.execute({
      assessments,
      job,
      user: userData.email,
    });
    return new CustomResponse()
      .message("Assessment updated")
      .statusCode(200)
      .response();
  };
}
