import eventProducer from "../events/producer.js";
import { buildSignUp } from "./signup.controller.js";
import { signUpSchema } from "../utils/validator.util.js";

const signupController = buildSignUp(signUpSchema, eventProducer);

export const authControllers = Object.freeze({ signupController });

export type IAuthControllers = typeof authControllers;
