import { IAppliedJobsRepoType } from "../../database/index.js";

export class GetApplicantsUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({ job, query }: { job: string; query: Record<string, any> }) {
    return await this.AppliedJobsRepo.getApplicants({ job, query });
  }
}
