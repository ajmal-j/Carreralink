import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { getPendingRequestsUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const companyData = req.companyData;
    const { p = 1 } = req.query;
    const query = {
      p: Number(p) ?? 1,
    };
    if (!companyData?.email) throw new NotFoundError("Company id not found");
    const data = await getPendingRequestsUsecase.execute({
      email: companyData.email,
      query,
    });
    return new CustomResponse()
      .data(data)
      .message("All Pending Requests.")
      .statusCode(200)
      .response();
  };
}
