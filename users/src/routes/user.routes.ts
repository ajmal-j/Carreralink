import { Router } from "express";
import { IUserController } from "../controllers/user/index.js";
import { expressCallback, VerifyAdmin, VerifyUser } from "@carreralink/common";

export default (
  router: any,
  userController: IUserController,
  imageUploader: any
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
  return router;
};
