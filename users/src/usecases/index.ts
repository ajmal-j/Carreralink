import { Repositories } from "../database/index.js";
import { AddEducationUsecase } from "./addEducation.usecase.js";
import { AddExperienceUsecase } from "./addExperience.usecase.js";
import { CreateUserUsecase } from "./createUser.usecase.js";
import { CurrentUserUsecase } from "./currentUser.usecase.js";
import { DeleteEducationUsecase } from "./deleteEducation.usecase.js";
import { UpdateEducationUsecase } from "./updateEducation.js";
import { UpdateProfileUsecase } from "./updateProile.usecase.js";
import { UpdateExperienceUsecase } from "./updateExperience.usecase.js";
import { DeleteExperienceUsecase } from "./deleteExperience.usecase.js";
import { AddSkillsUsecase } from "./addSkills.usecase.js";

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
};
