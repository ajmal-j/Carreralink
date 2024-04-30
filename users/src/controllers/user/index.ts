import { eventProducer } from "../../events/producer/producer.js";
import BuildAddEducation from "./addEducation.js";
import BuildAddExperience from "./addExperience.js";
import BuildAddResume from "./addResume.js";
import BuildAddSkill from "./addSkill.js";
import { BuildCurrentUser } from "./currentUser.js";
import BuildDeleteEducation from "./deleteEducation.js";
import BuildDeleteExperience from "./deleteExperience.js";
import BuildGetUser from "./getUser.js";
import BuildRemoveResume from "./removeResume.js";
import BuildUpdateEducation from "./updateEducation.js";
import BuildUpdateExperience from "./updateExperience.js";
import BuildUpdatePrimaryDetails from "./updatePrimaryDetails.js";
import BuildUpdatePrimaryResume from "./updatePrimaryResume.js";
import BuildUpdateResumeVisibility from "./updateResumeVisibility.js";
import BuildUpdateProfilePic from "./uploadProfilePic.js";
import BuildGetUsers from "./getUsers.js";
import BuildUsersList from "./usersList.js";

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
const addResume = BuildAddResume();
const removeResume = BuildRemoveResume();
const updatePrimaryResume = BuildUpdatePrimaryResume();
const updateResumeVisibility = BuildUpdateResumeVisibility();
const getUsers = BuildGetUsers();
const userList = BuildUsersList();

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
  addResume,
  removeResume,
  updatePrimaryResume,
  updateResumeVisibility,
  getUsers,
  userList,
});

export type IUserController = typeof userController;
