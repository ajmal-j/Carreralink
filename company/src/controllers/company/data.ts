import { Request } from "express";
import { getCompanyDataUsecase } from "../../usecases/index.js";
import { CustomResponse, NotFoundError } from "@carreralink/common";

declare module "express" {
  export interface Request {
    companyData: { email: string | undefined; id: string | undefined };
  }
}

export default () => {
  return async (req: Request) => {
    const data = req.companyData;
    if (!data?.email) throw new NotFoundError("Company id not found");

    const company = await getCompanyDataUsecase.execute(data.email);
    if (!company) throw new NotFoundError("Company not found");

    return new CustomResponse()
      .data(company)
      .statusCode(200)
      .message("All Companies.")
      .response();
  };
};
