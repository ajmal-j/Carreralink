import { CustomError } from "@carreralink/common";
import { ICompanyRepoType } from "../database/index.js";
import { ICompany } from "../database/models/company.model.js";

export class CreateCompanyUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(companyData: ICompany) {
    if (!companyData) throw new Error("Company data not found");
    const companyExist = await this.CompanyRepository.findByEmail(
      companyData.email
    );

    if (companyExist) throw new CustomError("Company already exists", 409);
    const company = await this.CompanyRepository.create(companyData);
    return;
  }
}
