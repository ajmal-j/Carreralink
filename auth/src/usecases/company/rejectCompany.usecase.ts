import { CompanyRepoType } from "../../database/index.js";

export class RejectCompanyUsecase {
  constructor(private readonly companyRepository: CompanyRepoType) {}

  async execute({ email }: { email: string }) {
    await this.companyRepository.deleteOne({ email });
  }
}
