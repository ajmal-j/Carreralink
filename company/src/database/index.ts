import { CompanyModel } from "./models/company.model.js";
import { JobsModel } from "./models/jobs.model.js";
import { CompanyRepository } from "./repository/company.repo.js";
import { JobRepository } from "./repository/job.repository.js";

export const Repositories = {
  CompanyRepository: new CompanyRepository(CompanyModel),
  JobRepository: new JobRepository(JobsModel),
};

export type ICompanyRepoType = typeof Repositories.CompanyRepository;
export type IJobRepoType = typeof Repositories.JobRepository;
