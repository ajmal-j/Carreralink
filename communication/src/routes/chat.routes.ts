import { VerifyUser, expressCallback } from "@carreralink/common";
import { IChatController } from "../controllers/chat/index.js";

export function ChatRoutes({
  router,
  chatControllers,
}: {
  router: any;
  chatControllers: IChatController;
}) {
  router.post("/create", VerifyUser, expressCallback(chatControllers.create));

  return router;
}
