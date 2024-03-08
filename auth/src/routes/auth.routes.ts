import { Router } from "express";
import { IAuthControllers } from "../controller";
import { expressCallback } from "@carreralink/common";

export default (router: Router, authControllers: IAuthControllers) => {
  router.post("/signup", expressCallback(authControllers.signupController));

  return router;
};
