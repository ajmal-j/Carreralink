import { IJobRepoType } from "../../database/index.js";

export class GetJobByIdUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}
  async execute(id: string) {
    return await this.JobRepository.job(id);
  }
}
