import { BadRequestError } from "@carreralink/common";
import { ICompanyRepoType } from "../../database/index.js";

export class GetCompanyDataUsecase {
  constructor(private readonly CompanyRepository: ICompanyRepoType) {}
  async execute(email?: string) {
    if (!email) throw new BadRequestError("Company email is required");
    const company = await this.CompanyRepository.findByEmail(email);
    if (!company) throw new BadRequestError("Company not found");
    return company;
  }
}
