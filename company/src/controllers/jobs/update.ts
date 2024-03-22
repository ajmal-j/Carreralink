import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { updateJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req.companyData;
    if (!companyData?.email) throw new NotFoundError("Company id not found");

    const { jobData, id } = req.body;
    if (!jobData) throw new NotFoundError("Job data not found");

    if (!id) throw new NotFoundError("Job id not found");
    const job = await updateJobUsecase.execute(id, jobData);
    return new CustomResponse()
      .data(job)
      .statusCode(200)
      .message("Job updated")
      .response();
  };
}
