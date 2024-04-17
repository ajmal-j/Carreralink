import { Request } from "express";
import { isRecruiterUsecase } from "../../usecases/index.js";
import { JobUsecase } from "../../usecases/jobs/index.js";
import { BadRequestError, CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    const { job, status } = req.body;
    if (!job || !status) throw new BadRequestError("Invalid Data");
    const recruiterData = await isRecruiterUsecase.execute(user?.email);
    await JobUsecase.updateStatus.execute({
      job,
      postedBy: recruiterData?.user?._id.toString(),
      status,
    });
    return new CustomResponse()
      .message("Job Status Updated")
      .statusCode(200)
      .response();
  };
}
