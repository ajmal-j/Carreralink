import { Request } from "express";
import { BadRequestError, CustomResponse } from "@carreralink/common";
import { getTotalCountByCompanyUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const company = req?.companyData;
    if (!company?.email) throw new BadRequestError("Company not found");
    const count = await getTotalCountByCompanyUsecase.execute(company.email);
    return new CustomResponse()
      .data(count)
      .message("Total Counts.")
      .statusCode(200)
      .response();
  };
}
