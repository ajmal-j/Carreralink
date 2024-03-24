import { ICompanyRepoType } from "../../database/index.js";

export class IsVerifiedUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(email: string) {
    return await this.CompanyRepository.isVerified(email);
  }
}
