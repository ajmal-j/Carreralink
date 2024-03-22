import { ICompanyRepoType } from "../../database/index.js";

export class GetCompanyUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}
  async execute(id: string) {
    return await this.CompanyRepository.get(id);
  }
}
