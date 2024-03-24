export interface ICompany {
  name: string;
  logo: string;
  id: string;
  email: string;
  _id?: string;
  website: string;
  isVerified: boolean;
  tagline: string;
  jobs: [];
  industry: string;
}
