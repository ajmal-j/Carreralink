import { Request } from "express";
import { isAppliedUsecase } from "../../usecases/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new Error("User not authenticated");
    const { job } = req.query;
    if (!job) throw new Error("Job not found");
    const applied = await isAppliedUsecase.execute({
      job: job as string,
      user: user.email,
    });
    return new CustomResponse()
      .data({
        application: applied,
        status: applied ? true : false,
      })
      .statusCode(200)
      .message("Applied Status")
      .response();
  };
}
