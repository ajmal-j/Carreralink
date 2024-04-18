import { CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { UserUsecases } from "../../usecases/user/index.js";
import { ChatUsecase } from "../../usecases/chat/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;

    const recruiterData = await UserUsecases.getByEmail.execute({
      email: user?.email,
    });

    const data = await ChatUsecase.recruiterChats.execute({
      recruiter: (await recruiterData?._id.toString()) ?? recruiterData.id,
    });

    return new CustomResponse()
      .data(data)
      .message("Chats")
      .statusCode(200)
      .response();
  };
}
