import { Request } from "express";
import { CustomResponse, NotFoundError } from "@carreralink/common";
import { getJobsUsecase } from "../../usecases/index.js";
import { Repositories } from "../../database/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req.companyData;
    const email = companyData?.email;
    
    const { q, location, type, p } = req.query;

    const query = {
      page: Number(p) ?? 1,
      q,
      location,
      type,
    } as const;

    if (!email) throw new NotFoundError("Company id not found");

    const id = await Repositories.CompanyRepository.getId(email);

    if (!id) throw new NotFoundError("Company id not found");
    // @ts-expect-error
    const data = await getJobsUsecase.execute(query, id);

    return new CustomResponse()
      .data(data)
      .message("All Jobs.")
      .statusCode(200)
      .response();
  };
}
