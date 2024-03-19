import { Repositories } from "../database/index.js";
import { CreateCompanyUsecase } from "./createCompany.usecase.js";

const createCompanyUsecase = new CreateCompanyUsecase(
  Repositories.CompanyRepository
);

export { createCompanyUsecase };
