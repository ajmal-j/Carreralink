import { Repositories } from "../../database/index.js";
import { CreateChatUsecase } from "./create.usecase.js";
import { FindChatUsecase } from "./find.usecase.js";
import { GetRecruiterChatsUseCase } from "./recruiterChats.usecase.js";
import { UpdateLatestUseCase } from "./updateLatest.usecase.js";
import { GetUserChatsUseCase } from "./userChats.usecase.js";

const create = new CreateChatUsecase(Repositories.chatRepository);
const userChats = new GetUserChatsUseCase(Repositories.chatRepository);
const recruiterChats = new GetRecruiterChatsUseCase(
  Repositories.chatRepository
);
const updateLatest = new UpdateLatestUseCase(Repositories.chatRepository);
const find = new FindChatUsecase(Repositories.chatRepository);

export const ChatUsecase = {
  create,
  userChats,
  recruiterChats,
  updateLatest,
  find,
};
