import { IJobRepoType } from "../../database/index.js";

export class GetAllJobsUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}
  async execute(query: {
    page?: number;
    q?: string;
    location?: string;
    type?: string;
  }) {
    return await this.JobRepository.allJobs(query);
  }
}
