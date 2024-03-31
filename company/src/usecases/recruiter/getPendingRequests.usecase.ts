import { NotFoundError } from "@carreralink/common";
import {
  ICompanyRepoType,
  IRecruiterRequestRepoType,
} from "../../database/index.js";

export class GetPendingRequestsUsecase {
  constructor(
    private readonly RecruiterRepository: IRecruiterRequestRepoType,
    private readonly CompanyRepository: ICompanyRepoType
  ) {}

  async execute({ email, query }: { email: string; query: { p: number } }) {
    const company = await this.CompanyRepository.findByEmail(email);
    if (!company) throw new NotFoundError("Company not found");
    return this.RecruiterRepository.pendingRequests({
      id: company.id,
      query,
    });
  }
}
