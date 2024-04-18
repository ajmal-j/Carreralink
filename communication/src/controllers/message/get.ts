import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { MessageUsecase } from "../../usecases/message/index.js";
import { ChatUsecase } from "../../usecases/chat/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    const { chatId } = req.query;

    if (!chatId) throw new BadRequestError("Chat not found");
    if (!userData?.email) throw new BadRequestError("User not authenticated");

    const chatData = await ChatUsecase.find.execute({
      chatId: chatId as string,
    });

    const messages = await MessageUsecase.get.execute({
      chatId: chatId as string,
    });

    const data = {
      ...chatData,
      messages,
    };

    return new CustomResponse()
      .data(data)
      .message("Messages")
      .statusCode(201)
      .response();
  };
}
