import { IJobRepoType } from "../../database/index.js";

export class AssignRecruiterUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute({
    company,
    job,
    recruiter,
  }: {
    job: string;
    recruiter: string;
    company: string;
  }) {
    const updated = await this.JobRepository.assignRecruiter({
      job,
      company,
      recruiter,
    });
    if (!updated.matchedCount) throw new Error("Job not found");

    return updated;
  }
}
