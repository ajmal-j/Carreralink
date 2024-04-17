import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { InterviewUsecase } from "../../usecases/interview/index.js";
import { isRecruiterUsecase } from "../../usecases/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    const { interview, status } = req.body;
    if (!interview || !status) throw new BadRequestError("Invalid Data");
    const interviewerData = await isRecruiterUsecase.execute(user?.email);
    await InterviewUsecase.updateStatus.execute({
      interview,
      status,
      interviewer: interviewerData?.user?._id?.toString(),
    });
    return new CustomResponse()
      .message("Interview Status Updated")
      .statusCode(200)
      .response();
  };
}
