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
  applicants: number;
  createdAt: string;
  status: "open" | "closed";
  officeLocation?: string | null;
  workSpace: string;
  openings: number;
  description: string;
}
