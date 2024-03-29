import { IJobRepoType } from "../../database/index.js";

export class DeleteJobsByAdminUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute({ jobs }: { jobs: string[] }) {
    return await this.JobRepository.deleteJobs({ jobs });
  }
}
