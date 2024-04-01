import { NotFoundError, UnauthorizedError } from "@carreralink/common";
import { ICompanyRepoType, IJobRepoType } from "../../database/index.js";

import { Job } from "../../entities/job.entity.js";

export class CreateJobUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType
  ) {}

  async execute(companyEmail: string, jobData: any) {
    if (!jobData) throw new NotFoundError("Job data not found");
    const company = await this.CompanyRepository.findByEmail(companyEmail);
    if (!company) throw new UnauthorizedError("Company not found");
    const data = {
      ...jobData,
      postedBy: {
        by: "company",
        ref: "Company",
        id: company._id,
      },
      company: company._id,
    };
    const job = new Job(data);
    const jobCreated = await this.JobRepository.create(job);
    const updatedInCompany = await this.CompanyRepository.updateJobs(
      companyEmail,
      jobCreated._id
    );
    return updatedInCompany;
  }
}
