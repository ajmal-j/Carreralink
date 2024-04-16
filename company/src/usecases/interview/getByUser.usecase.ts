import { IInterviewRepoType } from "../../database/index.js";

export class GetByUser {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute({
    applicant,
    query,
  }: {
    applicant: string;
    query: {
      p: number;
    };
  }) {
    return await this.InterviewRepo.getInterviews({
      applicant,
      query,
    });
  }
}
