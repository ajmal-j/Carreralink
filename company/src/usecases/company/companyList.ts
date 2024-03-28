import { ICompanyRepoType } from "../../database/index.js";

export class CompanyListUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(q: string) {
    return await this.CompanyRepository.companyList(q);
  }
}
