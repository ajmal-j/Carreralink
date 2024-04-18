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
  router.use(VerifyUser);
  router.post("/create", expressCallback(chatControllers.create));
  router.post("/message", expressCallback(messageController.create));
  router.get("/message", expressCallback(messageController.get));
  router.get(
    "/recruiterChats",
    expressCallback(chatControllers.getRecruiterChats)
  );
  router.get("/userChats", expressCallback(chatControllers.getUserChats));
  router.delete("/deleteChats", expressCallback(chatControllers.deleteChats));

  return router;
}
