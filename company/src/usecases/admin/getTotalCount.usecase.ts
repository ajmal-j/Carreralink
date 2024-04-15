import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
  IJobRepoType,
  IUserRepoType,
} from "../../database/index.js";

export class GetTotalCountUsecaseByAdmin {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly UserRepository: IUserRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType
  ) {}

  async execute(): Promise<{
    totalJobs: number;
    openJobs: number;
    totalCompanies: number;
    totalUsers: number;
    totalApplied: number;
  }> {
    return {
      totalJobs: await this.JobRepository.totalJobs(),
      openJobs: await this.JobRepository.totalOpenJobs(),
      totalCompanies: await this.CompanyRepository.totalCompanies(),
      totalUsers: await this.UserRepository.totalUsers(),
      totalApplied: await this.AppliedJobsRepo.totalApplicants(),
    };
  }
}
