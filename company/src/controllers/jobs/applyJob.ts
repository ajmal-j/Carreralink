import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { applyJobUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { resume, job } = req.body;
    if (!resume) throw new BadRequestError("Resume not found");
    if (!job) throw new BadRequestError("Job not found");
    const applied = await applyJobUsecase.execute({
      job,
      user: user.email,
      resume,
    });
    return new CustomResponse()
      .data(applied)
      .message("Applied successfully")
      .statusCode(200)
      .response();
  };
}
