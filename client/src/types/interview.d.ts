import { IUser } from "@/store/reducers/user.slice";

export interface IInterview {
  _id: string;
  applicant: IUser;
  job: IJob;
  startDate: string;
  time: string;
  status: "scheduled" | "cancelled" | "completed";
  interviewer: IUser;
  agenda: string;
  createdAt: string;
  cancelled: {
    reason: string;
    cancelledBy: "interviewer" | "applicant";
  };
}
