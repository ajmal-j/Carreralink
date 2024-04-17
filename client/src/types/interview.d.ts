import { IUserCompany } from "./company";

export interface IInterview {
  _id: string;
  applicant: IUserCompany;
  job: IJob;
  startDate: string;
  time: string;
  status: "scheduled" | "cancelled" | "completed";
  interviewer: IUserCompany;
  agenda: string;
  createdAt: string;
  cancelled: {
    reason: string;
    cancelledBy: "interviewer" | "applicant";
  };
}

