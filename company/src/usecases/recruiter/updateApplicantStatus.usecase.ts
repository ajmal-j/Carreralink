import { NotFoundError } from "@carreralink/common";
import { IAppliedJobsRepoType } from "../../database/index.js";

export class UpdateApplicantStatusUsecase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({
    status,
    job,
    user,
  }: {
    status: string;
    job: string;
    user: string;
  }): Promise<Object> {
    const result = await this.AppliedJobsRepo.updateStatus({
      status,
      job,
      user,
    });
    if (!result.matchedCount) throw new NotFoundError("Applicant not found");
    return result;
  }
}
