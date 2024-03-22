import { Request } from "express";
import { allCompaniesUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default () => {
  return async (req: Request) => {
    const data = await allCompaniesUsecase.execute();
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Companies.")
      .response();
  };
};
