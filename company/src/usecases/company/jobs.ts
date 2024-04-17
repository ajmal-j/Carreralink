import { IJobRepoType } from "../../database/index.js";

export class GetJobsUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}
  async execute(
    query: {
      page?: number;
      q?: string;
      location?: string;
      type?: string;
      status?: string;
    },
    companyId: string
  ) {
    return await this.JobRepository.allJobs(query, companyId);
  }
}
