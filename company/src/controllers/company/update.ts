import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { updateCompanyUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const data = req.companyData;
    const email = data?.email;
    if (!email) throw new NotFoundError("Company id not found");

    const companyData = req.body;
    if (!companyData) throw new NotFoundError("Company data not found");
    const updatedCompany = await updateCompanyUsecase.execute(
      email,
      companyData
    );

    return new CustomResponse()
      .message("Company updated successfully")
      .statusCode(200)
      .data(updatedCompany)
      .response();
  };
}
