import { Request } from "express";
import { getAllCompanyJobsUsecase } from "../../usecases/index.js";
import { CustomResponse, NotFoundError } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const { id } = req.query;
    if (!id) throw new NotFoundError("Company id not found");
    const data = await getAllCompanyJobsUsecase.execute(id as string);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Jobs.")
      .response();
  };
}
