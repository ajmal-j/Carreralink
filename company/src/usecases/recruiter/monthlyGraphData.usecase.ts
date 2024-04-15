import { IAppliedJobsRepoType, IJobRepoType } from "../../database/index.js";

export class RecruiterMonthlyGraphDataUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType
  ) {}

  async execute({ userId, companyId }: { userId: string; companyId: string }) {
    return [
      {
        label: "Jobs",
        data: await this.JobRepository.monthlyJobsGraphDataByRecruiter({
          userId,
          companyId,
        }),
      },
      {
        label: "Applicants",
        data: await this.AppliedJobsRepo.monthlyApplicantsByRecruiter({
          userId,
          companyId,
        }),
      },
    ];
  }
}
