import { ICompanyRepoType } from "../../database/index.js";
import { ICompany } from "../../database/models/company.model.js";

export class UpdateCompanyUsecase {
  constructor(private readonly companyRepository: ICompanyRepoType) {}

  async execute(email: string, companyData: ICompany) {
    return await this.companyRepository.update(email, companyData);
  }
}
