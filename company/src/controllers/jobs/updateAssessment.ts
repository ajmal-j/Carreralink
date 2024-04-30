import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { JobUsecase } from "../../usecases/jobs/index.js";

export default function () {
  return async (req: Request) => {
    const { job, assessments } = req.body;
    if (!job) throw new BadRequestError("Job not found");
    if (!assessments) throw new BadRequestError("Assessments not found");
    await JobUsecase.updateAssessmentUsecase.execute({
      job,
      assessments,
    });
    return new CustomResponse()
      .message("Assessment updated")
      .statusCode(200)
      .response();
  };
}
