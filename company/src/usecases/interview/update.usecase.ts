import { NotFoundError } from "@carreralink/common";
import { IInterviewRepoType } from "../../database/index.js";

export class UpdateInterviewUsecase {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute(data: {
    interview: string;
    agenda: string;
    startDate: string;
    time: string;
    interviewer: string;
  }) {
    const result = await this.InterviewRepo.updateInterview(data);
    if (!result.matchedCount) throw new NotFoundError("No interview found");
    return result;
  }
}
