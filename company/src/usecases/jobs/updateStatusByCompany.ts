import { BadRequestError } from "@carreralink/common";
import { IJobRepoType } from "../../database/index.js";

export class UpdateStatusByCompanyUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute({
    job,
    postedBy,
    status,
  }: {
    job: string;
    status: string;
    postedBy: string;
  }) {
    console.log(job, postedBy, status);
    const result = await this.JobRepository.updateStatusByCompany({
      job,
      postedBy,
      status,
    });
    if (!result.matchedCount) throw new BadRequestError("No job found");
    return result;
  }
}
