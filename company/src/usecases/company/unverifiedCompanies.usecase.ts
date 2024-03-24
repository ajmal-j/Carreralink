import { ICompanyRepoType } from "../../database/index.js";

export class UnverifiedCompaniesUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(query: { p: number }) {
    return await this.CompanyRepository.unverifiedCompanies(query);
  }
}
