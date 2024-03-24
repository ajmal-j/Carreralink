import { ICompanyRepoType } from "../../database/index.js";

export class VerifyCompanyUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(id: string) {
    return await this.CompanyRepository.confirmVerification(id);
  }
}
