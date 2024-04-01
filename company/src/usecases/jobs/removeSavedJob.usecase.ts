import { ISavedJobsRepoType } from "../../database/index.js";

export class RemoveSavedJobUsecase {
  constructor(private readonly SavedJobsRepo: ISavedJobsRepoType) {}

  async execute({ job, user }: { job: string; user: string }) {
    await this.SavedJobsRepo.remove({
      job,
      user,
    });
  }
}
