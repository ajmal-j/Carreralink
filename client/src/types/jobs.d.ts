import { ICompany, IUserCompany } from "./company";

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
  postedBy:
    | {
        id: IUserCompany;
        by: "recruiter";
      }
    | {
        id: ICompany;
        by: "company";
      };
}

export interface IApplicant {
  _id: string;
  user: {
    _id: string;
    username: string;
    profile: string;
    email: string;
  };
  job: string;
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

export type IApplied = {
  _id: string;
  createdAt: string;
  status: IAvailableStatus;
  resume: string;
  job: {
    _id: string;
    title: string;
    company: {
      _id: string;
      name: string;
      website: string;
      logo: string;
      tagline: string;
      email: string;
      industry: string;
      headquarters: string;
    };
    createdAt: string;
    type: string;
    category: string;
    officeLocation: string;
    workSpace: string;
    openings: string;
    status: string;
    skills: string[];
    pay: {
      maximum: string;
      minimum: string;
      rate: string;
    };
  };
};
