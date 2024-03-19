import { IPasswordUtil } from "@carreralink/common";
import { CompanyRepoType } from "../database/index.js";
import { Company, ICompany } from "../entities/company.entity.js";

export class CreateCompanyUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly companyRepository: CompanyRepoType
  ) {}

  async execute(company: ICompany) {
    const hashedPassword = await this.passwordUtil.hashPassword(
      company.password
    );
    company.password = hashedPassword;
    const newCompany = new Company(company);
    return await this.companyRepository.createCompany(newCompany);
  }
}
