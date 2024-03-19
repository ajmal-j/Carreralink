import eventProducer from "../../events/producer.js";
import { createCompanySchema } from "../../utils/validator.util.js";
import { buildRegister } from "./registerCompany.js";

const registerController = buildRegister(eventProducer, createCompanySchema);

export const companyControllers = {
  registerController,
};
export type ICompanyControllers = typeof companyControllers;
