export interface IJob {
  id: string;
  _id?: string;
  title: string;
  company: {
    id: number;
    _id?: string;
    name: string;
    logo: string;
  };
  type: string;
  skills: string[];
  pay: {
    minimum: number;
    maximum: number;
    rate: string;
  };
  href?: string;
  category: string;
  applicants: number;
  createdAt: string;
  status: "open" | "closed";
  officeLocation?: string | null;
  workSpace: string;
  openings: number;
  description: string;
}

export interface IApplicant {
  _id: string;
  user: {
    username: string;
    profile: string;
    email: string;
  };
  resume: string;
  createdAt: string;
  status: string;
}

export type IAvailableStatus =
  | "applied"
  | "interview"
  | "shortlisted"
  | "rejected"
  | "underReview"
  | "hired";
