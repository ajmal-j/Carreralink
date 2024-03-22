import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { createJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req.companyData;
    if (!companyData) throw new NotFoundError("Company data not found");
    const data = req.body;
    if (!data) throw new NotFoundError("Job data not found");
    const job = await createJobUsecase.execute(companyData.email, data);
    return new CustomResponse()
      .data(job)
      .statusCode(200)
      .message("Job created")
      .response();
  };
}
