import { NotFoundError } from "@carreralink/common";
import { IInterviewRepoType } from "../../database/index.js";
import { IInterview } from "../../database/models/interview.model.js";

export class CancelUsecase {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute({
    cancelledBy,
    reason,
    interview,
  }: {
    cancelledBy: string;
    reason: string;
    interview: string;
  }) {
    const cancel: IInterview["cancelled"]["cancelledBy"] =
      cancelledBy === "interviewer" ? "interviewer" : "applicant";

    const result = await this.InterviewRepo.cancelInterview({
      cancelledBy: cancel,
      reason,
      interview,
    });
    if (!result.matchedCount) throw new NotFoundError("Interview not found");
    return result;
  }
}
