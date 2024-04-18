import BuildCreateChatController from "./create.js";
import BuildGetRecruiterChatsController from "./getRecruiterChats.js";
import BuildGetUserChatsController from "./getUserChats.js";
import BuildDeleteChatsController from "./delete.js";

const create = BuildCreateChatController();
const getRecruiterChats = BuildGetRecruiterChatsController();
const getUserChats = BuildGetUserChatsController();
const deleteChats = BuildDeleteChatsController();

export const chatControllers = {
  create,
  getRecruiterChats,
  getUserChats,
  deleteChats,
};

export type IChatController = typeof chatControllers;
