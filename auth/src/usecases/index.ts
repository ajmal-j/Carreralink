import { passwordUtil } from "@carreralink/common";
import { SignUpUsecase } from "./signup.usecase.js";
import { Repositories } from "../database/index.js";
import { CompanyLogInUsecase } from "./companyLogin.usecase.js";
import { CreateCompanyUsecase } from "./createCompany.usecase.js";
import { LogInUsecase } from "./logIn.usecase.js";

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

export {
  signupUseCase,
  CompanyLogInUseCase,
  logInUseCase,
  createCompanyUsecase,
};
