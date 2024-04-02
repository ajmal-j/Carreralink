import { IAppliedJobsRepoType } from "../../database/index.js";

export class IsAppliedUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  execute({ job, user }: { job: string; user: string }) {
    return this.AppliedJobsRepo.isApplied({ job, user });
  }
}
