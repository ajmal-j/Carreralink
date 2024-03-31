import { BuildCurrentUser } from "./currentUser.js";
import BuildUpdatePrimaryDetails from "./updatePrimaryDetails.js";
import BuildAddEducation from "./addEducation.js";
import BuildUpdateEducation from "./updateEducation.js";
import BuildDeleteEducation from "./deleteEducation.js";
import BuildDeleteExperience from "./deleteExperience.js";
import BuildAddExperience from "./addExperience.js";
import BuildUpdateExperience from "./updateExperience.js";
import BuildAddSkill from "./addSkill.js";
import BuildUpdateProfilePic from "./uploadProfilePic.js";
import BuildGetUser from "./getUser.js";
import { eventProducer } from "../../events/producer/producer.js";

const currentUser = BuildCurrentUser();
const updatePrimaryDetails = BuildUpdatePrimaryDetails(eventProducer);
const addEducation = BuildAddEducation();
const addExperience = BuildAddExperience();
const updateEducation = BuildUpdateEducation();
const updateExperience = BuildUpdateExperience();
const deleteEducation = BuildDeleteEducation();
const deleteExperience = BuildDeleteExperience();
const addSkill = BuildAddSkill();
const updateProfilePic = BuildUpdateProfilePic(eventProducer);
const getUser = BuildGetUser();

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
  getUser,
});

export type IUserController = typeof userController;
