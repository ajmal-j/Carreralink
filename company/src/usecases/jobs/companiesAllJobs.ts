import { IJobRepoType } from "../../database/index.js";

export class GetAllCompanyJobsUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}
  async execute(id: string) {
    return await this.JobRepository.allJobsByCompany(id);
  }
}
