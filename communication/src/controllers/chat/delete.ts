import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { ChatUsecase } from "../../usecases/chat/index.js";
import { MessageUsecase } from "../../usecases/message/index.js";

export default function () {
  return async (req: Request) => {
    const user = req?.user;
    if (!user?.email) throw new BadRequestError("User not authenticated");
    const { chatId } = req.query;
    if (!chatId) throw new BadRequestError("Id not found");

    await ChatUsecase.deleteChat.execute({
      chatId: chatId as string,
    });

    await MessageUsecase.deleteMessage.execute({
      chatId: chatId as string,
    });

    return new CustomResponse()
      .message("Chat deleted")
      .statusCode(200)
      .response();
  };
}
