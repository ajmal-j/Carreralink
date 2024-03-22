import eventProducer from "../../events/producer.js";
import { createCompanySchema } from "../../utils/validator.util.js";
import { buildCompanyLogin } from "./login.js";
import { buildRegister } from "./registerCompany.js";

const registerController = buildRegister(eventProducer, createCompanySchema);
const logInController = buildCompanyLogin(createCompanySchema);

export const companyControllers = {
  registerController,
  logInController,
};
export type ICompanyControllers = typeof companyControllers;
