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

export interface IUserCompany {
  _id: string;
  id: string;
  username: string;
  email: string;
  profile: string;
}

interface IInterviewUsers extends IUserCompany {
  applicant?: string;
}
