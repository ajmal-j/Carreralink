export interface IInterview {
  _id: string;
  applicant: string | IJob;
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
