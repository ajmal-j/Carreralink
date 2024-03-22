export interface IJob {
  id: number;
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
  applicants?: [];
  createdAt: string;
  status: string;
  isPaused: boolean;
  openings: number;
}
