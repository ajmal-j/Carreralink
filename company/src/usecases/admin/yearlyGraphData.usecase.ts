import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
  IJobRepoType,
  IUserRepoType,
} from "../../database/index.js";

export class AdminYearlyGraphDataUsecase {
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
        data: await this.JobRepository.yearlyJobsGraphDataByAdmin(),
      },
      {
        label: "Applicants",
        data: await this.AppliedJobsRepo.yearlyApplicantsByAdmin(),
      },
      {
        label: "Companies",
        data: await this.CompanyRepository.yearlyCompanyGraphDataByAdmin(),
      },
      {
        label: "Users",
        data: await this.UserRepository.yearlyUsersGraphDataByAdmin(),
      },
    ];
  }
}
