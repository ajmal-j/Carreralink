import { Repositories } from "../../database/index.js";
import { CreateChatUsecase } from "./create.usecase.js";
import { GetRecruiterChatsUseCase } from "./recruiterChats.usecase.js";
import { GetUserChatsUseCase } from "./userChats.usecase.js";

const create = new CreateChatUsecase(Repositories.chatRepository);
const userChats = new GetUserChatsUseCase(Repositories.chatRepository);
const recruiterChats = new GetRecruiterChatsUseCase(
  Repositories.chatRepository
);

export const ChatUsecase = {
  create,
  userChats,
  recruiterChats,
};
