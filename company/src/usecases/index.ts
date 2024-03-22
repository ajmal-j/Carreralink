import { Repositories } from "../database/index.js";
import { JobRepository } from "../database/repository/job.repository.js";
import { AllCompaniesUsecase } from "./company/allCompanies.usecase.js";
import { CreateCompanyUsecase } from "./company/createCompany.usecase.js";
import { GetCompanyUsecase } from "./company/getCompany.usecase.js";
import { GetCompanyDataUsecase } from "./company/getData.usecase.js";
import { GetJobsUsecase } from "./company/jobs.js";
import { UpdateCompanyUsecase } from "./company/updateCompany.usecase.js";
import { EditJobUsecase } from "./jobs/EditJob.js";
import { GetAllJobsUsecase } from "./jobs/allJobs.usecase.js";
import { GetAllCompanyJobsUsecase } from "./jobs/companiesAllJobs.js";
import { CreateJobUsecase } from "./jobs/create.js";
import { GetJobByIdUsecase } from "./jobs/getJobById.usecase.js";
import { GetLocationsUsecase } from "./jobs/getLocations.js";

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
};
