import { Request } from "express";
import { getUserDataByEmailUsecase } from "../../usecases/index.js";
import { InterviewUsecase } from "../../usecases/interview/index.js";
import { CustomResponse } from "@carreralink/common";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    const q = req?.query;
    const query = {
      p: Number(q?.p) ?? 1,
    };
    const userData = await getUserDataByEmailUsecase.execute(user?.email);
    const interviews = await InterviewUsecase.getByUser.execute({
      applicant: userData?._id.toString(),
      query,
    });

    return new CustomResponse()
      .message("All Interviews.")
      .data(interviews)
      .statusCode(200)
      .response();
  };
}
