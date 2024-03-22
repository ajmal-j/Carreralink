import { ICompanyRepoType } from "../../database/index.js";

export class GetCompanyDataUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}
  async execute(email: string) {
    return await this.CompanyRepository.findByEmail(email);
  }
}
