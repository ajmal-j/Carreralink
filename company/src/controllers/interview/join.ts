import { CustomResponse, NotFoundError } from "@carreralink/common";
import { Request } from "express";
import { getUserDataByEmailUsecase } from "../../usecases/index.js";
import { InterviewUsecase } from "../../usecases/interview/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    const { id } = req?.query;
    if (!id) throw new NotFoundError("Interview Not Found");
    const userData = await getUserDataByEmailUsecase.execute(user?.email);
    const data = await InterviewUsecase.join.execute({
      id: userData?._id.toString(),
      interview: id as string,
    });

    return new CustomResponse()
      .data(data)
      .message("Joined")
      .statusCode(200)
      .response();
  };
}
