import { Repositories } from "../database/index";
import { buildSignUp } from "./signup.controller";
import { signUpSchema } from "../utils/validator.util";

const signupController = buildSignUp(Repositories.UserRepo, signUpSchema);

export const authControllers = Object.freeze({ signupController });

export type IAuthControllers = typeof authControllers;
