import { ICompanyRepoType } from "../../database/index.js";

export class AllCompaniesUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}
  async execute() {
    return await this.CompanyRepository.allCompanies();
  }
}
