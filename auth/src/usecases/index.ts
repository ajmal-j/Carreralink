import { passwordUtil } from "@carreralink/common";
import { SignUpUsecase } from "./signup.usecase.js";
import { Repositories } from "../database/index.js";
import { LogInUsecase } from "./logIn.usecase.js";

const signupUseCase = new SignUpUsecase(passwordUtil, Repositories.UserRepo);
const logInUseCase = new LogInUsecase(passwordUtil, Repositories.UserRepo);

export { signupUseCase, logInUseCase };
