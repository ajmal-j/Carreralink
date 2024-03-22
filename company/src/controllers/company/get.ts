import { Request } from "express";
import { getCompanyUsecase } from "../../usecases/index.js";
import { CustomResponse, NotFoundError } from "@carreralink/common";

export default () => {
  return async (req: Request) => {
    const { id } = req.query;
    if (!id) throw new NotFoundError("Company id not found");
    const data = await getCompanyUsecase.execute(id as string);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Companies.")
      .response();
  };
};
