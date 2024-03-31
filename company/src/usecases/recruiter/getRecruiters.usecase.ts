import { NotFoundError } from "@carreralink/common";
import {
  ICompanyRepoType,
  IRecruiterRequestRepoType,
} from "../../database/index.js";

export class GetRecruitersUsecase {
  constructor(
    private readonly RecruiterRepository: IRecruiterRequestRepoType,
    private readonly CompanyRepository: ICompanyRepoType
  ) {}

  async execute({ email, query }: { email: string; query: { p: number } }) {
    const company = await this.CompanyRepository.findByEmail(email);
    if (!company) throw new NotFoundError("Company not found");
    return this.RecruiterRepository.recruitersList({
      id: company.id,
      query,
    });
  }
}
