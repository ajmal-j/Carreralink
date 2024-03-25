import { passwordUtil } from "@carreralink/common";
import { SignUpUsecase } from "./user/signup.usecase.js";
import { Repositories } from "../database/index.js";
import { CompanyLogInUsecase } from "./company/companyLogin.usecase.js";
import { CreateCompanyUsecase } from "./company/createCompany.usecase.js";
import { LogInUsecase } from "./user/logIn.usecase.js";
import { GoogleLogInUsecase } from "./user/googleLogin.usecase.js";
import { AdminLoginUsecase } from "./admin/adminLogin.usecase.js";
import { UpdateUserBlockUsecase } from "./admin/updateUserBlock.usecase.js";

const signupUseCase = new SignUpUsecase(passwordUtil, Repositories.UserRepo);
const logInUseCase = new LogInUsecase(passwordUtil, Repositories.UserRepo);
const CompanyLogInUseCase = new CompanyLogInUsecase(
  passwordUtil,
  Repositories.CompanyRepo
);
const createCompanyUsecase = new CreateCompanyUsecase(
  passwordUtil,
  Repositories.CompanyRepo
);
const googleLoginUsecase = new GoogleLogInUsecase(Repositories.UserRepo);
const adminLoginUsecase = new AdminLoginUsecase(
  Repositories.UserRepo,
  passwordUtil
);

const updateBlockUsecase = new UpdateUserBlockUsecase(Repositories.UserRepo);

export {
  signupUseCase,
  CompanyLogInUseCase,
  logInUseCase,
  createCompanyUsecase,
  googleLoginUsecase,
  adminLoginUsecase,
  updateBlockUsecase,
};
