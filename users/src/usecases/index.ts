import { Repositories } from "../database/index.js";
import { AddEducationUsecase } from "./users/addEducation.usecase.js";
import { AddExperienceUsecase } from "./users/addExperience.usecase.js";
import { CreateUserUsecase } from "./users/createUser.usecase.js";
import { CurrentUserUsecase } from "./users/currentUser.usecase.js";
import { DeleteEducationUsecase } from "./users/deleteEducation.usecase.js";
import { UpdateEducationUsecase } from "./users/updateEducation.js";
import { UpdateProfileUsecase } from "./users/updateProile.usecase.js";
import { UpdateExperienceUsecase } from "./users/updateExperience.usecase.js";
import { DeleteExperienceUsecase } from "./users/deleteExperience.usecase.js";
import { AddSkillsUsecase } from "./users/addSkills.usecase.js";
import { GoogleLoginUsecase } from "./users/googleLogin.usecase.js";
import { UpdateProfilePicUsecase } from "./users/updateProfilePic.usecase.js";
import { GetUsersUsecase } from "./admin/getUsers.usecase.js";
import { ToggleBlockUsecase } from "./admin/toggleBlock.usecase.js";
import { GetUserUsecase } from "./users/getuser.usecase.js";
import { DeleteUsersUsecase } from "./admin/deleteUser.js";
import { AddResumeUsecase } from "./users/addResume.usecase.js";
import { RemoveResumeUsecase } from "./users/removeResume.usecase.js";
import { UpdatePrimaryResumeUsecase } from "./users/updatePrimaryResume.usecase.js";
import { UpdateResumeVisibilityUsecase } from "./users/updateResumeVisibility.usecase.js";
import { UpdatePlanUsageUsecase } from "./users/updatePlanUsage.usecase.js";
import { PlanPurchasedUseCase } from "./users/planPurchased.usecase.js";
import { UsersListUsecase } from "./users/usersList.usecase.js";

const createUserUsecase = new CreateUserUsecase(Repositories.UserDataRepo);
const currentUserUsecase = new CurrentUserUsecase(Repositories.UserDataRepo);
const updateEducationUsecase = new UpdateEducationUsecase(
  Repositories.UserDataRepo
);
const updateProfileUsecase = new UpdateProfileUsecase(
  Repositories.UserDataRepo
);
const addEducationUsecase = new AddEducationUsecase(Repositories.UserDataRepo);
const addExperienceUsecase = new AddExperienceUsecase(
  Repositories.UserDataRepo
);
const deleteEducationUsecase = new DeleteEducationUsecase(
  Repositories.UserDataRepo
);
const updateExperienceUsecase = new UpdateExperienceUsecase(
  Repositories.UserDataRepo
);
const deleteExperienceUsecase = new DeleteExperienceUsecase(
  Repositories.UserDataRepo
);
const addSkillUsecase = new AddSkillsUsecase(Repositories.UserDataRepo);
const googleLoginUsecase = new GoogleLoginUsecase(Repositories.UserDataRepo);
const updateProfilePicUsecase = new UpdateProfilePicUsecase(
  Repositories.UserDataRepo
);

const getUsersUsecase = new GetUsersUsecase(Repositories.UserDataRepo);
const toggleBlockUsecase = new ToggleBlockUsecase(Repositories.UserDataRepo);
const getUserUsecase = new GetUserUsecase(Repositories.UserDataRepo);
const deleteUsersUsecase = new DeleteUsersUsecase(Repositories.UserDataRepo);
const addResumeUsecase = new AddResumeUsecase(Repositories.UserDataRepo);
const removeResumeUsecase = new RemoveResumeUsecase(Repositories.UserDataRepo);
const updatePrimaryResumeUsecase = new UpdatePrimaryResumeUsecase(
  Repositories.UserDataRepo
);
const updateResumeVisibilityUsecase = new UpdateResumeVisibilityUsecase(
  Repositories.UserDataRepo
);
const updatePlanUsageUsecase = new UpdatePlanUsageUsecase(
  Repositories.UserDataRepo
);
const planPurchasedUseCase = new PlanPurchasedUseCase(
  Repositories.UserDataRepo
);
const usersListUsecase = new UsersListUsecase(Repositories.UserDataRepo);

export {
  createUserUsecase,
  currentUserUsecase,
  updateProfileUsecase,
  updateEducationUsecase,
  addEducationUsecase,
  deleteEducationUsecase,
  addExperienceUsecase,
  updateExperienceUsecase,
  addSkillUsecase,
  deleteExperienceUsecase,
  googleLoginUsecase,
  updateProfilePicUsecase,
  getUsersUsecase,
  toggleBlockUsecase,
  getUserUsecase,
  deleteUsersUsecase,
  addResumeUsecase,
  removeResumeUsecase,
  updatePrimaryResumeUsecase,
  updateResumeVisibilityUsecase,
  updatePlanUsageUsecase,
  planPurchasedUseCase,
  usersListUsecase,
};
