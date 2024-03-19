import { Router } from "express";
import { IAuthControllers } from "../controller/index.js";
import { expressCallback } from "@carreralink/common";
import { VerifyUser } from "../utils/utils.js";

export default (router: Router, authControllers: IAuthControllers) => {
  router.post("/signup", expressCallback(authControllers.signupController));
  router.post("/login", expressCallback(authControllers.logInController));
  router.get(
    "/current",
    VerifyUser,
    expressCallback(authControllers.currentUserController)
  );
  return router;
};
