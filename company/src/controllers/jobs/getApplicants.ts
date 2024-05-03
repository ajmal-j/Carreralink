import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { getApplicantsUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { job, p = 1, status } = req.query;
    const query = {
      p: Number(p) ?? 1,
      status: status as string,
    };
    if (!job) throw new BadRequestError("Job not found");
    const applicants = await getApplicantsUsecase.execute({
      job: job as string,
      query,
    });
    return new CustomResponse()
      .message("All Applicants")
      .data(applicants)
      .statusCode(200)
      .response();
  };
}
