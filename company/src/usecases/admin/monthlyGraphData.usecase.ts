import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
  IJobRepoType,
  IUserRepoType,
} from "../../database/index.js";

export class AdminMonthlyGraphDataUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly UserRepository: IUserRepoType,
    private readonly CompanyRepository: ICompanyRepoType
  ) {}

  async execute() {
    return [
      {
        label: "Jobs",
        data: await this.JobRepository.monthlyJobsGraphDataByAdmin(),
      },
      {
        label: "Applicants",
        data: await this.AppliedJobsRepo.monthlyApplicantsByAdmin(),
      },
      {
        label: "Companies",
        data: await this.CompanyRepository.monthlyCompanyGraphDataByAdmin(),
      },
      {
        label: "Users",
        data: await this.UserRepository.monthlyUsersGraphDataByAdmin(),
      },
    ];
  }
}
