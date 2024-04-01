import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import { isJobSavedUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { job } = req.query;
    if (!job) throw new NotFoundError("Job not found");
    const saved = await isJobSavedUsecase.execute({
      job: job as string,
      user: user.email,
    });
    return new CustomResponse()
      .data(saved ? true : false)
      .statusCode(200)
      .response();
  };
}
