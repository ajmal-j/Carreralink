import { IAppliedJobsRepoType } from "../../database/index.js";

export class GetAppliedJobsUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({
    user,
    query,
  }: {
    user: string;
    query: {
      p: number;
    };
  }) {
    return await this.AppliedJobsRepo.getAppliedJobs({ user, query });
  }
}
