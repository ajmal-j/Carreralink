import { InternalServerError } from "@carreralink/common";
import { IAppliedJobsRepoType, IJobRepoType } from "../../database/index.js";

export class WithdrawAppliedUsecase {
  constructor(
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly JobRepository: IJobRepoType
  ) {}
  async execute({ job, user }: { job: string; user: string }) {
    const withdraw = await this.AppliedJobsRepo.withdraw({ job, user });
    if (!withdraw)
      throw new InternalServerError("Failed to withdraw application");
    await this.JobRepository.withdraw(job);
    return withdraw;
  }
}
