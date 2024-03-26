import eventProducer from "../../events/producer.js";
import { buildSignUp } from "./signup.controller.js";
import { logInSchema, signUpSchema } from "../../utils/validator.util.js";
import { buildLogIn } from "./login.controller.js";
import buildGoogleLogIn from "./googleLogin.js";

const signupController = buildSignUp(signUpSchema, eventProducer);
const logInController = buildLogIn(logInSchema);
const googleLoginController = buildGoogleLogIn(eventProducer);

export const authControllers = Object.freeze({
  signupController,
  logInController,
  googleLoginController,
});

export type IAuthControllers = typeof authControllers;
