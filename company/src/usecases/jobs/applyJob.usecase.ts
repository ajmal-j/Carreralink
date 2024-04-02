import { IAppliedJobsRepoType } from "../../database/index.js";

export class ApplyJobUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({
    job,
    user,
    resume,
  }: {
    job: string;
    user: string;
    resume: string;
  }) {
    return await this.AppliedJobsRepo.apply({ job, user, resume });
  }
}
