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
    counts: {
      totalJobs: number;
      openJobs: number;
      totalCompanies: number;
      totalUsers: number;
      totalApplied: number;
    };
    recentJobs: any[];
  }> {
    const [
      totalJobs,
      openJobs,
      totalCompanies,
      totalUsers,
      totalApplied,
      recentJobs,
    ] = await Promise.all([
      this.JobRepository.totalJobs(),
      this.JobRepository.totalOpenJobs(),
      this.CompanyRepository.totalCompanies(),
      this.UserRepository.totalUsers(),
      this.AppliedJobsRepo.totalApplicants(),
      this.JobRepository.allJobs({ sort: "most recent" }),
    ]);

    return {
      counts: {
        totalJobs,
        openJobs,
        totalCompanies,
        totalUsers,
        totalApplied,
      },
      recentJobs,
    };
  }
}
