import { CompanyModel } from "./models/company.model.js";
import { UserModel } from "./models/user.model.js";
import { CompanyRepository } from "./repositories/company.repository.js";
import { UserRepository } from "./repositories/user.repository.js";

export const Repositories = {
  UserRepo: new UserRepository(UserModel),
  CompanyRepo: new CompanyRepository(CompanyModel),
};
export type UserRepoType = typeof Repositories.UserRepo;
export type CompanyRepoType = typeof Repositories.CompanyRepo;
