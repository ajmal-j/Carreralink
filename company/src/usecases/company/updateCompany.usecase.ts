import { BadRequestError } from "@carreralink/common";
import { ICompanyRepoType } from "../../database/index.js";
import { ICompany } from "../../database/models/company.model.js";

export class UpdateCompanyUsecase {
  constructor(private readonly companyRepository: ICompanyRepoType) {}

  async execute({
    email,
    companyData,
    id,
  }: {
    email?: string;
    companyData: ICompany;
    id?: string;
  }) {
    if (!id && !email) throw new BadRequestError("Email or id is required");
    return await this.companyRepository.update({ email, id, companyData });
  }
}
