import { BadRequestError, CustomResponse } from "@carreralink/common";
import { Request } from "express";
import { UserUsecases } from "../../usecases/user/index.js";
import { ChatUsecase } from "../../usecases/chat/index.js";
import { MessageUsecase } from "../../usecases/message/index.js";

export default function () {
  return async (req: Request) => {
    const userData = req?.user;
    const { chatId, content } = req.body;
    if (!userData) throw new BadRequestError("User not authenticated");
    if (!chatId) throw new BadRequestError("Chat not found");
    if (!content) throw new BadRequestError("Content not found");

    const senderData = await UserUsecases.getByEmail.execute({
      email: userData.email,
    });

    const message = await MessageUsecase.create.execute({
      chatId,
      content,
      sender: (await senderData._id.toString()) ?? senderData.id,
    });

    await ChatUsecase.updateLatest.execute({
      chatId,
      messageId: (await message._id.toString()) ?? message.id,
    });

    return new CustomResponse()
      .message("Chat created")
      .data(message)
      .statusCode(201)
      .response();
  };
}
