import { IAppliedJobsRepoType, IJobRepoType } from "../../database/index.js";

export class CompanyMonthlyGraphDataUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType
  ) {}

  async execute({ companyId }: { companyId: string }) {
    return [
      {
        label: "Jobs",
        data: await this.JobRepository.monthlyJobsGraphDataByCompany({
          companyId,
        }),
      },
      {
        label: "Applicants",
        data: await this.AppliedJobsRepo.monthlyApplicantsByCompany({
          companyId,
        }),
      },
    ];
  }
}
