import { VerifyUser, expressCallback } from "@carreralink/common";
import { IChatController } from "../controllers/chat/index.js";
import { IMessageController } from "../controllers/message/index.js";

export function ChatRoutes({
  router,
  chatControllers,
  messageController,
}: {
  router: any;
  chatControllers: IChatController;
  messageController: IMessageController;
}) {
  router.post("/create", VerifyUser, expressCallback(chatControllers.create));
  router.post(
    "/message",
    VerifyUser,
    expressCallback(messageController.create)
  );
  router.get("/message", VerifyUser, expressCallback(messageController.get));
  router.get(
    "/recruiterChats",
    VerifyUser,
    expressCallback(chatControllers.getRecruiterChats)
  );
  router.get(
    "/userChats",
    VerifyUser,
    expressCallback(chatControllers.getUserChats)
  );
  return router;
}
