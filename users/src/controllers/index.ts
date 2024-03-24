import { BuildCurrentUser } from "./currentUser.js";
import BuildUpdatePrimaryDetails from "./updatePrimaryDetails.js";
import BuildAddEducation from "./addEducation.js";
import BuildUpdateEducation from "./updateEducation.js";
import BuildDeleteEducation from "./deleteEducation.js";
import BuildDeleteExperience from "./deleteExperience.js";
import BuildAddExperience from "./addExperience.js";
import BuildUpdateExperience from "./updateExperience.js";
import BuildAddSkill from "./addSkill.js";
import UpdateProfilePicBuild from "./uploadProfilePic.js";
import BuildCurrentAdmin from "./currentAdmin.js";

const currentUser = BuildCurrentUser();
const currentAdmin = BuildCurrentAdmin();
const updatePrimaryDetails = BuildUpdatePrimaryDetails();
const addEducation = BuildAddEducation();
const addExperience = BuildAddExperience();
const updateEducation = BuildUpdateEducation();
const updateExperience = BuildUpdateExperience();
const deleteEducation = BuildDeleteEducation();
const deleteExperience = BuildDeleteExperience();
const addSkill = BuildAddSkill();
const updateProfilePic = UpdateProfilePicBuild();

export const userController = Object.freeze({
  currentUser,
  updatePrimaryDetails,
  addSkill,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  updateProfilePic,
  deleteExperience,
  currentAdmin,
});

export type IUserController = typeof userController;
