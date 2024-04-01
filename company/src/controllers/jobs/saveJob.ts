import {
  BadRequestError,
  CustomResponse,
  NotFoundError,
} from "@carreralink/common";
import { Request } from "express";
import { saveJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { job } = req.body;
    if (!job) throw new NotFoundError("Job not found");
    const saved = await saveJobUsecase.execute({ job, user: user.email });
    return new CustomResponse()
      .data(saved)
      .message("Job saved")
      .statusCode(200)
      .response();
  };
}
