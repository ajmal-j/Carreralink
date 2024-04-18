import { Repositories } from "../../database/index.js";
import { CreateMessageUsecase } from "./create.usecase.js";
import { GetMessageUsecase } from "./get.usecase.js";

const create = new CreateMessageUsecase(Repositories.messageRepository);
const get = new GetMessageUsecase(Repositories.messageRepository);

export const MessageUsecase = {
  create,
  get,
};
