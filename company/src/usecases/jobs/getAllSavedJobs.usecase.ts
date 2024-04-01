import { ISavedJobsRepoType } from "../../database/index.js";

export class GetAllSavedJobsUsecase {
  constructor(private readonly SavedJobsRepo: ISavedJobsRepoType) {}

  async execute({
    email,
    query,
  }: {
    email: string;
    query: {
      p: number;
    };
  }) {
    return await this.SavedJobsRepo.getSavedJobs({
      email,
      query,
    });
  }
}
