import { CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { usersListUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const { q, p } = req.query;
    const query = {
      p: Number(p) ?? 1,
      q: q as string,
    };
    const data = await usersListUsecase.execute(query);
    return new CustomResponse()
      .data(data)
      .statusCode(200)
      .message("All users.")
      .response();
  };
}
