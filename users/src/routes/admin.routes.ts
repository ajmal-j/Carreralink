import { Router } from "express";
import { IAdminController } from "../controllers/admin/index.js";
import { VerifyAdmin, expressCallback } from "@carreralink/common";

export default function (adminRouter: any, adminController: IAdminController) {
  adminRouter.get(
    "/currentAdmin",
    VerifyAdmin,
    expressCallback(adminController.currentAdmin)
  );
  adminRouter.get(
    "/users",
    VerifyAdmin,
    expressCallback(adminController.getUsers)
  );
  return adminRouter;
}
