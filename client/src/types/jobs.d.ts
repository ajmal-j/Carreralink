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
    plan?: {
      currentPlan: string;
      planType: "basic" | "premium" | "none";
      expiryDate: Date | string;
      purchaseDate: Date | string;
      features: Record<string, boolean>;
    };
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
  assessments: [] | IAssessment[];
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
  score: string;
  assessmentScore: string;
  assessments: {
    no: number;
    question: string;
    answer: string;
  }[];
  isAssessmentDone: boolean;
  reasonForRejection?: string;
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

export interface IAssessment {
  no: number;
  question: string;
  expectedAnswer?: string;
}
