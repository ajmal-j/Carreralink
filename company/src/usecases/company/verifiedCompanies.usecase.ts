import { ICompanyRepoType } from "../../database/index.js";

export class VerifiedCompaniesUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(query: { p: number }) {
    return await this.CompanyRepository.verifiedCompanies(query);
  }
}
