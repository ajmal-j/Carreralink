import { ChatModel } from "./models/chat.model.js";
import { MessageModel } from "./models/message.model.js";
import { UserModel } from "./models/user.model.js";
import { ChatRepository } from "./respositories/chat.repo.js";
import { MessageRepository } from "./respositories/message.repo.js";
import { UserRepository } from "./respositories/user.repo.js";

export const Repositories = {
  chatRepository: new ChatRepository(ChatModel),
  messageRepository: new MessageRepository(MessageModel),
  userRepository: new UserRepository(UserModel),
};

export type IChatRepository = (typeof Repositories)["chatRepository"];
export type IMessageRepository = (typeof Repositories)["messageRepository"];
export type IUserRepository = (typeof Repositories)["userRepository"];
