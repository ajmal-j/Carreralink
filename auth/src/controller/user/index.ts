import eventProducer from "../../events/producer.js";
import { buildSignUp } from "./signup.controller.js";
import { logInSchema, signUpSchema } from "../../utils/validator.util.js";
import { buildLogIn } from "./login.controller.js";
import { currentUser } from "./currentUser.js";

const signupController = buildSignUp(signUpSchema, eventProducer);
const logInController = buildLogIn(logInSchema);
const currentUserController = currentUser;

export const authControllers = Object.freeze({
  signupController,
  logInController,
  currentUserController,
});

export type IAuthControllers = typeof authControllers;
