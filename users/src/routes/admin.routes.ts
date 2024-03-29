import { IAdminController } from "../controllers/admin/index.js";
import { VerifyAdmin, expressCallback } from "@carreralink/common";

export default function (adminRouter: any, adminController: IAdminController) {
  adminRouter.use(VerifyAdmin);
  adminRouter.get(
    "/currentAdmin",
    expressCallback(adminController.currentAdmin)
  );
  adminRouter.get("/users", expressCallback(adminController.getUsers));
  adminRouter.patch(
    "/toggleBlock",
    expressCallback(adminController.toggleBlock)
  );
  adminRouter.delete(
    "/deleteUsers",
    expressCallback(adminController.deleteUsers)
  );
  return adminRouter;
}
