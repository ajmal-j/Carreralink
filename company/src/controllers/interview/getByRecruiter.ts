import { Request } from "express";
import { isRecruiterUsecase } from "../../usecases/index.js";
import { InterviewUsecase } from "../../usecases/interview/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    const q = req?.query;
    const query = {
      p: Number(q?.p) ?? 1,
    };

    const recruiter = await isRecruiterUsecase.execute(user?.email);
    const data = await InterviewUsecase.getByRecruiter.execute({
      interviewer: recruiter?.user?._id.toString(),
      query,
    });

    return new CustomResponse()
      .data(data)
      .message("All interviews")
      .statusCode(200)
      .response();
  };
}
