import { ISavedJobsRepoType } from "../../database/index.js";

export class SaveJobUsecase {
  constructor(private readonly SavedJobsRepo: ISavedJobsRepoType) {}

  async execute({ job, user }: { job: string; user: string }) {
    return await this.SavedJobsRepo.save({ job, user });
  }
}
