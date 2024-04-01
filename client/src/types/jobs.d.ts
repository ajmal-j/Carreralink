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
  location: string;
  type: string;
  skills: string[];
  pay: {
    minimum: number;
    maximum: number;
    rate: string;
  };
  href?: string;
  category: string;
  applicants?: [];
  createdAt: string;
  status: string;
  officeLocation?: string | null;
  isPaused: boolean;
  workSpace: string;
  openings: number;
  description: string;
}
