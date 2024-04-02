import { InternalServerError } from "@carreralink/common";
import { IAppliedJobsRepoType, IJobRepoType } from "../../database/index.js";

export class ApplyJobUsecase {
  constructor(
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly JobRepository: IJobRepoType
  ) {}

  async execute({
    job,
    user,
    resume,
  }: {
    job: string;
    user: string;
    resume: string;
  }) {
    const applied = await this.AppliedJobsRepo.apply({ job, user, resume });
    if (!applied) throw new InternalServerError("Failed to apply job");
    await this.JobRepository.applied(job);
    return applied;
  }
}
