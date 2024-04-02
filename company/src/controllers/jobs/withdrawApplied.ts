import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { withdrawAppliedUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { job } = req.query;
    if (!job) throw new BadRequestError("Job not found");
    await withdrawAppliedUsecase.execute({
      job: job as string,
      user: user.email,
    });
    return new CustomResponse()
      .message("Applied withdrawn")
      .statusCode(200)
      .response();
  };
}
