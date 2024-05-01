import { BadRequestError } from "@carreralink/common";
import { IAppliedJobsRepoType } from "../../database/index.js";

export class ApplicationAssessmentUseCase {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({
    job,
    user,
    assessments,
  }: {
    job: string;
    user: string;
    assessments: Record<string, any>[];
  }) {
    if (!job) throw new BadRequestError("Job Id not found");
    if (!assessments) throw new BadRequestError("Assessments not found");
    if (!user) throw new BadRequestError("User Id not found");

    const updated = await this.AppliedJobsRepo.updateAssessment({
      job,
      user,
      assessments,
    });
    if (!updated.matchedCount) throw new BadRequestError("No job found");
    return updated;
  }
}
