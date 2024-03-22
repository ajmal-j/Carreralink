import { Request } from "express";
import { getAllJobsUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const { q, location, type, p } = req.query;
    const query = {
      page: Number(p) ?? 1,
      q,
      location,
      type,
    } as const;
    const data = await getAllJobsUsecase.execute(query as {});
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All Jobs.")
      .response();
  };
}
