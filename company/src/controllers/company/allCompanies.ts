import { Request } from "express";
import { allCompaniesUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default () => {
  return async (req: Request) => {
    const { p, q, search } = req.query;
    const data = await allCompaniesUsecase.execute({
      p: Number(p) ?? 1,
      q: q as string,
      search: search as string,
    });
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Companies.")
      .response();
  };
};
