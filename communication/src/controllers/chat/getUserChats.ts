import { CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { UserUsecases } from "../../usecases/user/index.js";
import { ChatUsecase } from "../../usecases/chat/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;

    const userData = await UserUsecases.getByEmail.execute({
      email: user?.email,
    });

    const data = await ChatUsecase.userChats.execute({
      user: (await userData?._id.toString()) ?? userData.id,
    });

    return new CustomResponse()
      .data(data)
      .message("Chats")
      .statusCode(200)
      .response();
  };
}
