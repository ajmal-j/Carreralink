import { IAppliedJobsRepoType, IJobRepoType } from "../../database/index.js";

export class RecruiterYearlyGraphDataUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType
  ) {}

  async execute({ userId, companyId }: { userId: string; companyId: string }) {
    return [
      {
        label: "Jobs",
        data: await this.JobRepository.yearlyJobsGraphDataByRecruiter({
          userId,
          companyId,
        }),
      },
      {
        label: "Applicants",
        data: await this.AppliedJobsRepo.yearlyApplicantsByRecruiter({
          userId,
          companyId,
        }),
      },
    ];
  }
}
