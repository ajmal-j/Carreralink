import { CompanyModel } from "./models/company.model.js";
import { OtpModel } from "./models/otp.model.js";
import { UserModel } from "./models/user.model.js";
import { CompanyRepository } from "./repositories/company.repository.js";
import { OtpRepository } from "./repositories/otp.repository.js";
import { UserRepository } from "./repositories/user.repository.js";

export const Repositories = {
  UserRepo: new UserRepository(UserModel),
  CompanyRepo: new CompanyRepository(CompanyModel),
  OtpRepo: new OtpRepository(OtpModel),
};
export type UserRepoType = typeof Repositories.UserRepo;
export type CompanyRepoType = typeof Repositories.CompanyRepo;
export type OtpRepoType = typeof Repositories.OtpRepo;
