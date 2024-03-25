import { CompanyModel } from "./models/company.model.js";
import { JobsModel } from "./models/jobs.model.js";
import { SkillAndCategoryModel } from "./models/skillAndCategoryModel.model.js";
import { CompanyRepository } from "./repository/company.repo.js";
import { JobRepository } from "./repository/job.repository.js";
import { SkillsAndCategoryRepository } from "./repository/skillsAndCategory.repo.js";

export const Repositories = {
  CompanyRepository: new CompanyRepository(CompanyModel),
  JobRepository: new JobRepository(JobsModel),
  SkillsAndCategoryRepository: new SkillsAndCategoryRepository(
    SkillAndCategoryModel
  ),
};

export type ICompanyRepoType = typeof Repositories.CompanyRepository;
export type IJobRepoType = typeof Repositories.JobRepository;
export type ISkillsAndCategoryRepoType =
  typeof Repositories.SkillsAndCategoryRepository;
