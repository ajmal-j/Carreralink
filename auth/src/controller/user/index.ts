import eventProducer from "../../events/producers/producer.js";
import { buildSignUp } from "./signup.controller.js";
import { logInSchema, signUpSchema } from "../../utils/validator.util.js";
import { buildLogIn } from "./login.controller.js";
import buildGoogleLogIn from "./googleLogin.js";
import buildVerifyUser from "./verifyUser.js";
import buildResentOtp from "./resentOtp.js";

const signupController = buildSignUp(signUpSchema);
const logInController = buildLogIn(logInSchema);
const googleLoginController = buildGoogleLogIn(eventProducer);
const verifyUser = buildVerifyUser({ eventProducer });
const resentOtp = buildResentOtp();

export const authControllers = Object.freeze({
  signupController,
  logInController,
  googleLoginController,
  verifyUser,
  resentOtp,
});

export type IAuthControllers = typeof authControllers;
