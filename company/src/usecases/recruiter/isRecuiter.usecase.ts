import { BadRequestError } from "@carreralink/common";
import {
  ICompanyRepoType,
  IRecruiterRequestRepoType,
} from "../../database/index.js";

export class IsRecruiterUsecase {
  constructor(
    private readonly RecruiterRepository: IRecruiterRequestRepoType,
    private readonly CompanyRepository: ICompanyRepoType
  ) {}

  async execute(email: string) {
    const exist = await this.RecruiterRepository.isRecruiter(email);
    if (!exist) throw new BadRequestError("Not a recruiter");
    const company = await this.CompanyRepository.findByEmail(exist.company);
    if (!company) throw new BadRequestError("Company not found");
    return {
      email: exist.user,
      company: company.name,
      id: company._id,
      logo: company.logo,
    };
  }
}
