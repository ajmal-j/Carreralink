import { ICompanyRepoType } from "../../database/index.js";

export class AllCompaniesUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}
  async execute(query: { p: number; q?: string, search?: string }) {
    return await this.CompanyRepository.allCompanies(query);
  }
}
