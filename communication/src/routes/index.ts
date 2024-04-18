import { Router } from "express";
import { ChatRoutes } from "./chat.routes.js";
import { chatControllers } from "../controllers/chat/index.js";

const chat = Router();

const chatRoutes = ChatRoutes({
  router: chat,
  chatControllers,
});

export { chatRoutes };
