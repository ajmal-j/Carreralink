import { NotFoundError } from "@carreralink/common";
import { IJobRepoType } from "../../database/index.js";

export class EditJobUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute(id: string, jobData: any) {
    if (!jobData) throw new NotFoundError("Job data not found");
    if (!id) throw new NotFoundError("Job Id not found");
    const job = await this.JobRepository.updateJob(id, jobData);
    return job;
  }
}
