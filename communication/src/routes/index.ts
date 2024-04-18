import { Router } from "express";
import { ChatRoutes } from "./chat.routes.js";
import { chatControllers } from "../controllers/chat/index.js";
import { messageController } from "../controllers/message/index.js";

const chat = Router();

const chatRoutes = ChatRoutes({
  router: chat,
  chatControllers,
  messageController,
});

export { chatRoutes };
