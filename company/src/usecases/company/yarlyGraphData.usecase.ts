import { IAppliedJobsRepoType, IJobRepoType } from "../../database/index.js";

export class CompanyYearlyGraphDataUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType
  ) {}

  async execute({ companyId }: { companyId: string }) {
    return [
      {
        label: "Jobs",
        data: await this.JobRepository.yearlyJobsGraphDataByCompany({
          companyId,
        }),
      },
      {
        label: "Applicants",
        data: await this.AppliedJobsRepo.yearlyApplicantsByCompany({
          companyId,
        }),
      },
    ];
  }
}
