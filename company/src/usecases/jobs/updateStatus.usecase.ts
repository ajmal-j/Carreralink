import { BadRequestError } from "@carreralink/common";
import { IJobRepoType } from "../../database/index.js";

export class UpdateStatusUsecase {
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
    const result = await this.JobRepository.updateStatus({
      job,
      postedBy,
      status,
    });
    if (!result.matchedCount) throw new BadRequestError("No job found");
    return result;
  }
}
