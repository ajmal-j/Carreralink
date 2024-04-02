import { IAppliedJobsRepoType } from "../../database/index.js";

export class GetApplicantsUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({
    job,
    query,
  }: {
    job: string;
    query: {
      p: number;
    };
  }) {
    return await this.AppliedJobsRepo.getApplicants({ job, query });
  }
}
