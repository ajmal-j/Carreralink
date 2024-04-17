import { UnauthorizedError } from "@carreralink/common";
import { IInterviewRepoType } from "../../database/index.js";

export class JoinInterviewUsecase {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute({ interview, id }: { interview: string; id: string }) {
    const isApplicant = await this.InterviewRepo.isApplicant({
      applicant: id,
      interview,
    });
    if (isApplicant) {
      return isApplicant.applicant;
    }
    const isInterviewer = await this.InterviewRepo.isInterviewer({
      interviewer: id,
      interview,
    });
    if (isInterviewer) {
      return isInterviewer.interviewer;
    }
    throw new UnauthorizedError("User not authorized to join this interview.");
  }
}
