import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { Repositories } from "../../database/index.js";
import {
    companyMonthlyGraphDataUsecase,
    companyYearlyGraphDataUsecase,
} from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { filter } = req.query;
    const companyData = req?.companyData;
    const company = await Repositories.CompanyRepository.getId(
      companyData?.email as string
    );
    if (!company.id) throw new BadRequestError("Company id not found");
    let data = {};
    if (filter === "yearly") {
      data = await companyYearlyGraphDataUsecase.execute({
        companyId: company.id as string,
      });
    } else {
      data = await companyMonthlyGraphDataUsecase.execute({
        companyId: company.id as string,
      });
    }
    return new CustomResponse().data(data).statusCode(200).response();
  };
}
