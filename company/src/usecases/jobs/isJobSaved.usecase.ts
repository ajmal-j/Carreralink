import { ISavedJobsRepoType } from "../../database/index.js";

export class IsJobSavedUsecase {
  constructor(private readonly SavedJobsRepo: ISavedJobsRepoType) {}

  async execute({ job, user }: { job: string; user: string }) {
    return await this.SavedJobsRepo.isSaved({ job, user });
  }
}
