import BuildCreateChatController from "./create.js";
import BuildGetChatController from "./get.js";

const create = BuildCreateChatController();
const getChats = BuildGetChatController();

export const chatControllers = {
  create,
  getChats,
};

export type IChatController = typeof chatControllers;
