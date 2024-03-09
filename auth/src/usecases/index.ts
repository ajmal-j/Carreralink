import { passwordUtil } from "@carreralink/common";
import { SignUpUsecase } from "./signup.usecase.js";
import { Repositories } from "../database/index.js";

const signupUseCase = new SignUpUsecase(passwordUtil, Repositories.UserRepo);

export { signupUseCase };
