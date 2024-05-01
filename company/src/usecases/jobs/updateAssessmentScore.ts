import { IAppliedJobsRepoType } from "../../database/index.js";
import { IAppliedJob } from "../../database/models/appliedJobs.model.js";

export class UpdateAssessmentScore {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}
  async execute({
    data,
  }: {
    data: {
      job: string;
      user: string;
      score: string;
    };
  }) {
    const { job, user, score } = data;

    if (isNaN(Number(score))) return console.log("score is not a number");
    if (!job || !user || !score) return console.log("data is missing");

    let reasonForRejection: string | undefined;
    let status: IAppliedJob["status"] | undefined;

    if (Number(score) <= 3) {
      reasonForRejection = "Low assessment score";
      status = "rejected";
    }

    await this.AppliedJobsRepo.updateAssessmentScore({
      job,
      user,
      score,
      reasonForRejection,
      status,
    });
  }
}
