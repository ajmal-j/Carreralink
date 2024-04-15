import { NotFoundError } from "@carreralink/common";
import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
  IJobRepoType,
  IRecruiterRequestRepoType,
} from "../../database/index.js";

export class GetTotalCountUsecaseByCompany {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly RecruiterRepository: IRecruiterRequestRepoType
  ) {}

  async execute(email: string): Promise<{
    totalJobs: number;
    openJobs: number;
    totalRecruiters: number;
    totalApplied: number;
  }> {
    const company = await this.CompanyRepository.findByEmail(email);
    if (!company) throw new NotFoundError("Company not found");

    return {
      totalJobs: await this.JobRepository.totalJobsByCompany(company.id),
      openJobs: await this.JobRepository.totalOpenJobsByCompany(company.id),
      totalRecruiters: await this.RecruiterRepository.totalRecruiters(
        company.id
      ),
      totalApplied: await this.AppliedJobsRepo.totalApplicantsByCompany(
        company.id
      ),
    };
  }
}
