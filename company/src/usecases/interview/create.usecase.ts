import { IInterviewRepoType } from "../../database/index.js";

export interface IInterview {
  applicant: string;
  job: string;
  startDate: string;
  agenda: string;
  interviewer: string;
  time: string;
  status: "scheduled" | "cancelled" | "completed";
}

export class CreateUsecase {
  constructor(private readonly InterviewRepo: IInterviewRepoType) {}

  async execute(data: IInterview) {
    return this.InterviewRepo.create(data);
  }
}
