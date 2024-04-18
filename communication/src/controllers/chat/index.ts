import BuildCreateChatController from "./create.js";
import BuildGetRecruiterChatsController from "./getRecruiterChats.js";
import BuildGetUserChatsController from "./getUserChats.js";

const create = BuildCreateChatController();
const getRecruiterChats = BuildGetRecruiterChatsController();
const getUserChats = BuildGetUserChatsController();

export const chatControllers = {
  create,
  getRecruiterChats,
  getUserChats,
};

export type IChatController = typeof chatControllers;
