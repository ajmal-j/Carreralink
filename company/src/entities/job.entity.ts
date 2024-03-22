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
  constructor(job: IJob) {
    Object.assign(this, job);
  }
}
