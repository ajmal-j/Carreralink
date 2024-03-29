import { Request } from "express";
import { getJobsByAdminUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const { p, q } = req.query;
    const query = {
      page: Number(p) ?? 1,
      q: q as string,
    };
    const data = await getJobsByAdminUsecase.execute(query);
    return new CustomResponse()
      .data(data)
      .message("All Jobs.")
      .statusCode(200)
      .response();
  };
}
