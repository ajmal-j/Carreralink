import { IAppliedJobsRepoType } from "../../database/index.js";
import { IAppliedJob } from "../../database/models/appliedJobs.model.js";

export class UpdateApplicationScore {
  constructor(private readonly AppliedJobsRepo: IAppliedJobsRepoType) {}

  async execute({ data }: { data: { score: string; application: string } }) {
    const { score, application } = data;
    if (!score || !application) return console.log("no data found");
    if (isNaN(Number(score))) return console.log("score is not a number");

    let reasonForRejection = "";
    let status: IAppliedJob["status"] | undefined;

    if (Number(score) <= 3) {
      reasonForRejection = "Low resume score.";
      status = "rejected";
    }
    await this.AppliedJobsRepo.updateScore({
      application,
      data: { score, reasonForRejection, status },
    });
  }
}
