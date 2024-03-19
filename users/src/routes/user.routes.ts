import { Router } from "express";
import { IUserController } from "../controllers/index.js";
import { expressCallback, VerifyUser } from "@carreralink/common";

export default (router: any, userController: IUserController): Router => {
  router.get(
    "/current",
    VerifyUser,
    expressCallback(userController.currentUser)
  );
  router.patch(
    "/updateProfile",
    VerifyUser,
    expressCallback(userController.updatePrimaryDetails)
  );
  router.patch(
    "/updateEducation",
    VerifyUser,
    expressCallback(userController.updateEducation)
  );
  router.post(
    "/addEducation",
    VerifyUser,
    expressCallback(userController.addEducation)
  );
  router.delete(
    "/deleteEducation",
    VerifyUser,
    expressCallback(userController.deleteEducation)
  );
  router.post(
    "/addExperience",
    VerifyUser,
    expressCallback(userController.addExperience)
  );
  router.patch(
    "/updateExperience",
    VerifyUser,
    expressCallback(userController.updateExperience)
  );
  router.delete(
    "/deleteExperience",
    VerifyUser,
    expressCallback(userController.deleteExperience)
  );
  router.post(
    "/addSkills",
    VerifyUser,
    expressCallback(userController.addSkill)
  );
  return router;
};
