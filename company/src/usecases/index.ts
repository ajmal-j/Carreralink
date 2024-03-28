import { Repositories } from "../database/index.js";
import { AllCompaniesUsecase } from "./company/allCompanies.usecase.js";
import { CreateCompanyUsecase } from "./company/createCompany.usecase.js";
import { GetCompanyUsecase } from "./company/getCompany.usecase.js";
import { GetCompanyDataUsecase } from "./company/getData.usecase.js";
import { GetJobsUsecase } from "./company/jobs.js";
import { UnverifiedCompaniesUsecase } from "./company/unverifiedCompanies.usecase.js";
import { UpdateCompanyUsecase } from "./company/updateCompany.usecase.js";
import { VerifiedCompaniesUsecase } from "./company/verifiedCompanies.usecase.js";
import { EditJobUsecase } from "./jobs/EditJob.js";
import { GetAllJobsUsecase } from "./jobs/allJobs.usecase.js";
import { GetAllCompanyJobsUsecase } from "./jobs/companiesAllJobs.js";
import { CreateJobUsecase } from "./jobs/create.js";
import { GetJobByIdUsecase } from "./jobs/getJobById.usecase.js";
import { GetLocationsUsecase } from "./jobs/getLocations.js";
import { RejectCompanyUsecase } from "./admin/rejectCompany.usecase.js";
import { VerifyCompanyUsecase } from "./admin/verifyCompany.usecase.js";
import { IsVerifiedUsecase } from "./company/isVerified.js";
import { AddCategoryUsecase } from "./admin/addCategory.usecase.js";
import { AddSkillsUsecase } from "./admin/addSkills.usecase.js";
import { SkillsAndCategoryRepository } from "./admin/getSkillsAndCategory.usecase.js";
import { RemoveSkillUsecase } from "./admin/removeSkill.usecase.js";
import { RemoveCategoryUsecase } from "./admin/removeCategory.usecase.js";
import { CompanyListUsecase } from "./company/companyList.js";

const createCompanyUsecase = new CreateCompanyUsecase(
  Repositories.CompanyRepository
);
const allCompaniesUsecase = new AllCompaniesUsecase(
  Repositories.CompanyRepository
);
const getCompanyUsecase = new GetCompanyUsecase(Repositories.CompanyRepository);
const getCompanyDataUsecase = new GetCompanyDataUsecase(
  Repositories.CompanyRepository
);
const updateCompanyUsecase = new UpdateCompanyUsecase(
  Repositories.CompanyRepository
);

const createJobUsecase = new CreateJobUsecase(
  Repositories.JobRepository,
  Repositories.CompanyRepository
);

const getJobByIdUsecase = new GetJobByIdUsecase(Repositories.JobRepository);

const getAllJobsUsecase = new GetAllJobsUsecase(Repositories.JobRepository);
const getAllCompanyJobsUsecase = new GetAllCompanyJobsUsecase(
  Repositories.JobRepository
);
const updateJobUsecase = new EditJobUsecase(Repositories.JobRepository);
const getJobsUsecase = new GetJobsUsecase(Repositories.JobRepository);
const getLocationsUsecase = new GetLocationsUsecase(Repositories.JobRepository);
const verifiedCompaniesUsecase = new VerifiedCompaniesUsecase(
  Repositories.CompanyRepository
);
const unverifiedCompaniesUsecase = new UnverifiedCompaniesUsecase(
  Repositories.CompanyRepository
);
const verifyCompanyUsecase = new VerifyCompanyUsecase(
  Repositories.CompanyRepository
);
const rejectCompanyUsecase = new RejectCompanyUsecase(
  Repositories.CompanyRepository
);

const isVerifiedUsecase = new IsVerifiedUsecase(Repositories.CompanyRepository);

const addCategoryUsecase = new AddCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);
const addSkillsUsecase = new AddSkillsUsecase(
  Repositories.SkillsAndCategoryRepository
);

const getSkillsAndCategory = new SkillsAndCategoryRepository(
  Repositories.SkillsAndCategoryRepository
);

const removeSkillUsecase = new RemoveSkillUsecase(
  Repositories.SkillsAndCategoryRepository
);

const removeCategoryUsecase = new RemoveCategoryUsecase(
  Repositories.SkillsAndCategoryRepository
);

const companyListUsecase = new CompanyListUsecase(
  Repositories.CompanyRepository
);

export {
  createCompanyUsecase,
  allCompaniesUsecase,
  getAllCompanyJobsUsecase,
  getCompanyUsecase,
  getJobByIdUsecase,
  getCompanyDataUsecase,
  createJobUsecase,
  updateCompanyUsecase,
  getAllJobsUsecase,
  updateJobUsecase,
  getJobsUsecase,
  getLocationsUsecase,
  verifiedCompaniesUsecase,
  unverifiedCompaniesUsecase,
  verifyCompanyUsecase,
  rejectCompanyUsecase,
  isVerifiedUsecase,
  addCategoryUsecase,
  addSkillsUsecase,
  getSkillsAndCategory,
  removeSkillUsecase,
  removeCategoryUsecase,
  companyListUsecase,
};
