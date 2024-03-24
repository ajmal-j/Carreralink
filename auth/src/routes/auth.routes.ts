import { Router } from "express";
import { IAuthControllers } from "../controller/user/index.js";
import { expressCallback } from "@carreralink/common";
import { VerifyUser } from "../utils/utils.js";
import { ICompanyControllers } from "../controller/company/index.js";
import { IAdminController } from "../controller/admin/index.js";

export default (
  router: Router,
  authControllers: IAuthControllers,
  companyControllers: ICompanyControllers,
  adminController: IAdminController
) => {
  router.post("/signup", expressCallback(authControllers.signupController));
  router.post("/login", expressCallback(authControllers.logInController));
  router.get(
    "/current",
    VerifyUser,
    expressCallback(authControllers.currentUserController)
  );
  router.post(
    "/register",
    expressCallback(companyControllers.registerController)
  );
  router.post(
    "/companyLogin",
    expressCallback(companyControllers.logInController)
  );
  router.post(
    "/googleLogin",
    expressCallback(authControllers.googleLoginController)
  );
  router.post(
    "/adminLogin",
    expressCallback(adminController.adminLoginController)
  );

  return router;
};
