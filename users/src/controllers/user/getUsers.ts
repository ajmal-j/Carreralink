import { CustomResponse } from "@carreralink/common";
import { getUsersUsecase } from "../../usecases/index.js";
import { Request } from "express";

export default function () {
  return async (req: Request) => {
    const { q, p } = req.query;
    const query = {
      p: Number(p) ?? 1,
      q: q as string,
    };
    const data = await getUsersUsecase.execute(query);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All users.")
      .response();
  };
}
