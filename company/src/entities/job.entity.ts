interface IJob {
  title: string;
  type: string;
  category: string;
  company: string;
  officeLocation: string;
  workSpace: string;
  openings: string;
  skills: string[];
  description: string;
  pay: {
    maximum: string;
    minimum: string;
    rate: string;
  };
  postedBy: {
    by: "recruiter" | "company";
    ref: "User" | "Company";
    id: string;
  };
}

export class Job implements IJob {
  title: string = "";
  type: string = "";
  category: string = "";
  company: string = "";
  officeLocation: string = "";
  workSpace: string = "";
  openings: string = "";
  skills: string[] = [];
  description: string = "";
  pay: {
    maximum: string;
    minimum: string;
    rate: string;
  } = {
    maximum: "",
    minimum: "",
    rate: "",
  };
  postedBy: {
    by: "recruiter" | "company";
    ref: "User" | "Company";
    id: string;
  } = {
    by: "company",
    ref: "Company",
    id: "",
  };

  constructor(job: IJob) {
    Object.assign(this, job);
  }
}
