import { Request } from "express";
import { BadRequestError, CustomResponse } from "@carreralink/common";
import { getTotalCountByRecruiterUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const count = await getTotalCountByRecruiterUsecase.execute(user.email);
    return new CustomResponse()
      .data(count)
      .message("Total Counts.")
      .statusCode(200)
      .response();
  };
}
