import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import { updatePrimaryResumeUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { primary } = req.body;
    if (!primary && primary !== 0) throw new NotFoundError("Primary not found");
    const { resume } = await updatePrimaryResumeUsecase.execute(
      user.email,
      primary
    );
    return new CustomResponse()
      .message("Updated")
      .data(resume)
      .statusCode(200)
      .response();
  };
}
