import { IAppliedJobsRepoType } from "../../database/index.js";

export class WithdrawAppliedUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}
  async execute({ job, user }: { job: string; user: string }) {
    return await this.AppliedJobsRepo.withdraw({ job, user });
  }
}
