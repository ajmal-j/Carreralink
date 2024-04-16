import { IInterviewRepoType } from "../../database/index.js";

export class GetByRecruiter {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute({
    interviewer,
    query,
  }: {
    interviewer: string;
    query: {
      p: number;
    };
  }) {
    return await this.InterviewRepo.getInterviewsByRecruiter({
      interviewer,
      query,
    });
  }
}
