import BuildCreateMessageController from "./create.js";
import BuildGetMessageController from "./get.js";

const create = BuildCreateMessageController();
const get = BuildGetMessageController();

export const messageController = {
  create,
  get,
};

export type IMessageController = typeof messageController;
