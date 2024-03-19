import { CompanyModel } from "./models/company.model.js";
import { CompanyRepository } from "./repository/company.repo.js";

export const Repositories = {
  CompanyRepository: new CompanyRepository(CompanyModel),
};

export type ICompanyRepoType = typeof Repositories.CompanyRepository;
