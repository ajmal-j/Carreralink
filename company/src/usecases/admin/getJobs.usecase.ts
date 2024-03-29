import { IJobRepoType } from "../../database/index.js";

export class GetJobsByAdminUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute(query: { page?: number; q?: string }) {
    return this.JobRepository.allJobsByAdmin(query);
  }
}
