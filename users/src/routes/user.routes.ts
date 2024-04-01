import { VerifyUser, expressCallback } from "@carreralink/common";
import { RequestHandler, Router } from "express";
import { IUserController } from "../controllers/user/index.js";

export default (
  router: any,
  userController: IUserController,
  imageUploader: RequestHandler,
  resumeUploader: RequestHandler
): Router => {
  router.get(
    "/currentUser",
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
  router.post(
    "/updateProfilePic",
    VerifyUser,
    imageUploader,
    expressCallback(userController.updateProfilePic)
  );
  router.get("/getUser", expressCallback(userController.getUser));
  router.post(
    "/addResume",
    VerifyUser,
    resumeUploader,
    expressCallback(userController.addResume)
  );
  router.delete(
    "/removeResume",
    VerifyUser,
    expressCallback(userController.removeResume)
  );
  router.patch(
    "/updatePrimaryResume",
    VerifyUser,
    expressCallback(userController.updatePrimaryResume)
  );
  router.patch(
    "/updateResumeVisibility",
    VerifyUser,
    expressCallback(userController.updateResumeVisibility)
  );
  return router;
};
