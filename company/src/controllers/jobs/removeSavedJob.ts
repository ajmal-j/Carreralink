import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import { removeSavedJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { job } = req.query;
    if (!job) throw new NotFoundError("Job not found");
    await removeSavedJobUsecase.execute({
      job: job as string,
      user: user.email,
    });
    return new CustomResponse()
      .message("Job removed")
      .statusCode(200)
      .response();
  };
}
