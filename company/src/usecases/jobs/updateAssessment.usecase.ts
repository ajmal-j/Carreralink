import { BadRequestError } from "@carreralink/common";
import { IJobRepoType } from "../../database/index.js";

export class UpdateAssessmentUsecase {
  constructor(private readonly JobRepository: IJobRepoType) {}

  async execute({
    job,
    assessments,
  }: {
    job: string;
    assessments: Record<string, any>[];
  }) {
    if (!job) throw new BadRequestError("Job Id not found");
    if (!assessments) throw new BadRequestError("Assessments not found");
    const updated = await this.JobRepository.updateAssessment({
      job,
      assessments,
    });
    if (!updated.matchedCount) throw new BadRequestError("No job found");
    return updated;
  }
}
