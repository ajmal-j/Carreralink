import { ICompanyRepoType } from "../../database/index.js";

export class RejectCompanyUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}

  async execute(id: string) {
    return await this.CompanyRepository.rejectVerification(id);
  }
}
