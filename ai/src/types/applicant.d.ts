interface IAppliedJob {
  job: string;
  user: string;
  score: string;
  status:
    | "applied"
    | "interview"
    | "shortlisted"
    | "rejected"
    | "underReview"
    | "hired";
  id: string;
  reasonForRejection?: string;
  resume: string;
}
