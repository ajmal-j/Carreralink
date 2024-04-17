import { NotFoundError } from "@carreralink/common";
import { IInterviewRepoType } from "../../database/index.js";

export class UpdateStatusUsecase {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute({
    interview,
    status,
    interviewer,
  }: {
    interview: string;
    status: string;
    interviewer: string;
  }) {
    const result = await this.InterviewRepo.updateStatus({
      interview,
      interviewer,
      status,
    });
    if (!result.matchedCount) throw new NotFoundError("No interview found");
    return result;
  }
}
