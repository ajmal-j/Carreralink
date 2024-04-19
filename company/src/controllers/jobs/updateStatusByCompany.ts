import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { getCompanyDataUsecase } from "../../usecases/index.js";
import { JobUsecase } from "../../usecases/jobs/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req?.companyData;
    const { job, status } = req.body;
    if (!job || !status) throw new BadRequestError("Invalid Data");

    const company = await getCompanyDataUsecase.execute(companyData?.email);

    await JobUsecase.updateStatusByCompany.execute({
      job,
      postedBy: company?._id.toString(),
      status,
    });
    return new CustomResponse()
      .message("Job Status Updated")
      .statusCode(200)
      .response();
  };
}
