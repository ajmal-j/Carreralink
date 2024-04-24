import { AppliedJobsModel } from "./models/appliedJobs.model.js";
import { CompanyModel } from "./models/company.model.js";
import { InterviewModel } from "./models/interview.model.js";
import { JobsModel } from "./models/jobs.model.js";
import { RecruiterRequestModel } from "./models/recruiterRequest.model.js";
import { SavedJobModel } from "./models/savedJobs.model.js";
import { UserModel } from "./models/user.model.js";
import { AppliedJobsRepo } from "./repository/appliedJobs.repo.js";
import { CompanyRepository } from "./repository/company.repo.js";
import { InterviewRepository } from "./repository/interview.repo.js";
import { JobRepository } from "./repository/job.repository.js";
import { RecruiterRequestRepository } from "./repository/recruiterRequest.repo.js";
import { SavedJobsRepo } from "./repository/savedJobs.repo.js";
import { SkillsAndCategoryRepository } from "./repository/skillsAndCategory.repo.js";
import { UserRepository } from "./repository/user.repo.js";

export const Repositories = {
  CompanyRepository: new CompanyRepository(CompanyModel),
  JobRepository: new JobRepository(JobsModel),
  RecruiterRequestRepository: new RecruiterRequestRepository(
    RecruiterRequestModel
  ),
  UserRepository: new UserRepository(UserModel),
  SavedJobsRepo: new SavedJobsRepo(SavedJobModel),
  AppliedJobsRepo: new AppliedJobsRepo(AppliedJobsModel),
  InterviewRepository: new InterviewRepository(InterviewModel),
};

export type ICompanyRepoType = typeof Repositories.CompanyRepository;
export type IUserRepoType = typeof Repositories.UserRepository;
export type IJobRepoType = typeof Repositories.JobRepository;

export type ISavedJobsRepoType = typeof Repositories.SavedJobsRepo;
export type IAppliedJobsRepoType = typeof Repositories.AppliedJobsRepo;
export type IRecruiterRequestRepoType =
  typeof Repositories.RecruiterRequestRepository;

export type IInterviewRepoType = typeof Repositories.InterviewRepository;
