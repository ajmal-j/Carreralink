import { BadRequestError, UnauthorizedError } from "@carreralink/common";
import { IInterviewRepoType } from "../../database/index.js";

export class JoinInterviewUsecase {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute({ interview, id }: { interview: string; id: string }) {
    const isApplicant = await this.InterviewRepo.isApplicant({
      applicant: id,
      interview,
    });
    if (isApplicant) {
      if (isApplicant.status === "completed")
        throw new BadRequestError("Interview already completed");
      return {
        user: isApplicant.applicant,
        isInterviewer: false,
      };
    }
    const isInterviewer = await this.InterviewRepo.isInterviewer({
      interviewer: id,
      interview,
    });
    if (isInterviewer) {
      if (isInterviewer.status === "completed")
        throw new BadRequestError("Interview already completed");
      return {
        user: isInterviewer.interviewer,
        isInterviewer: true,
      };
    }
    throw new UnauthorizedError("User not authorized to join this interview.");
  }
}
