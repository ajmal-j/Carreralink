import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { JobUsecase } from "../../usecases/jobs/index.js";
import { getCompanyDataUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req.companyData;
    const { recruiter, job } = req.body;
    if (!recruiter) throw new BadRequestError("Recruiter not found");
    if (!job) throw new BadRequestError("Job not found");
    if (!companyData?.email) throw new BadRequestError("Company not found");

    const company = await getCompanyDataUsecase.execute(companyData?.email);

    await JobUsecase.assignRecruiter.execute({
      job,
      company: company?._id.toString(),
      recruiter,
    });

    return new CustomResponse()
      .statusCode(200)
      .message("Recruiter assigned")
      .response();
  };
}
