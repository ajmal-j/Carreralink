import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import { removeResumeUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { url } = req.query;
    if (!url) throw new NotFoundError("Url not found");
    const { resume } = await removeResumeUsecase.execute(
      user.email,
      url as string
    );
    return new CustomResponse()
      .data(resume)
      .message("Resume removed successfully")
      .statusCode(200)
      .response();
  };
}
