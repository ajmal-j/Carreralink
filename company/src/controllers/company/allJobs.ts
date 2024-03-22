import { Request } from "express";
import { Repositories } from "../../database/index.js";
import { CustomResponse, NotFoundError } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const companyData = req.companyData;
    const email = companyData?.email;
    if (!email) throw new NotFoundError("Company id not found");
    const data = await Repositories.CompanyRepository.allJobs(email);
    return new CustomResponse()
      .data(data)
      .message("All Jobs.")
      .statusCode(200)
      .response();
  };
}
