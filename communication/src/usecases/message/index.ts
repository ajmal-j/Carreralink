import { Repositories } from "../../database/index.js";
import { CreateMessageUsecase } from "./create.usecase.js";
import { DeleteMessagesUsecase } from "./delete.usecase.js";
import { GetMessageUsecase } from "./get.usecase.js";

const create = new CreateMessageUsecase(Repositories.messageRepository);
const get = new GetMessageUsecase(Repositories.messageRepository);
const deleteMessage = new DeleteMessagesUsecase(Repositories.messageRepository);

export const MessageUsecase = {
  create,
  get,
  deleteMessage,
};
