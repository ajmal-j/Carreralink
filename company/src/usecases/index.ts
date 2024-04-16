import { Repositories } from "../database/index.js";
import { AddCategoryUsecase } from "./admin/addCategory.usecase.js";
import { AddSkillsUsecase } from "./admin/addSkills.usecase.js";
import { DeleteJobsByAdminUsecase } from "./admin/deleteJobsByAdmin.usecase.js";
import { GetJobsByAdminUsecase } from "./admin/getJobs.usecase.js";
import { SkillsAndCategoryRepository } from "./admin/getSkillsAndCategory.usecase.js";
import { GetTotalCountUsecaseByAdmin } from "./admin/getTotalCount.usecase.js";
import { RejectCompanyUsecase } from "./admin/rejectCompany.usecase.js";
import { RemoveCategoryUsecase } from "./admin/removeCategory.usecase.js";
import { RemoveSkillUsecase } from "./admin/removeSkill.usecase.js";
import { VerifyCompanyUsecase } from "./admin/verifyCompany.usecase.js";
import { AllCompaniesUsecase } from "./company/allCompanies.usecase.js";
import { CompanyListUsecase } from "./company/companyList.js";
import { CreateCompanyUsecase } from "./company/createCompany.usecase.js";
import { GetCompanyUsecase } from "./company/getCompany.usecase.js";
import { GetCompanyDataUsecase } from "./company/getData.usecase.js";
import { GetTotalCountUsecaseByCompany } from "./company/getTotalCounts.usecase.js";
import { IsVerifiedUsecase } from "./company/isVerified.js";
import { GetJobsUsecase } from "./company/jobs.js";
import { CompanyMonthlyGraphDataUsecase } from "./company/monthlyGraphData.usecase.js";
import { UnverifiedCompaniesUsecase } from "./company/unverifiedCompanies.usecase.js";
import { UpdateCompanyUsecase } from "./company/updateCompany.usecase.js";
import { UpdateCoverPhotoUsecase } from "./company/updateCoverPhoto.usecase.js";
import { VerifiedCompaniesUsecase } from "./company/verifiedCompanies.usecase.js";
import { CompanyYearlyGraphDataUsecase } from "./company/yarlyGraphData.usecase.js";
import { EditJobUsecase } from "./jobs/EditJob.js";
import { GetAllJobsUsecase } from "./jobs/allJobs.usecase.js";
import { ApplyJobUsecase } from "./jobs/applyJob.usecase.js";
import { GetAllCompanyJobsUsecase } from "./jobs/companiesAllJobs.js";
import { CreateJobUsecase } from "./jobs/create.js";
import { CreateJobByRecruiterUsecase } from "./jobs/createJobByRecruiter.js";
import { GetAllSavedJobsUsecase } from "./jobs/getAllSavedJobs.usecase.js";
import { GetApplicantsUsecase } from "./jobs/getApplicants.usecase.js";
import { GetAppliedJobsUsecase } from "./jobs/getAppliedJobs.usecase.js";
import { GetJobByIdUsecase } from "./jobs/getJobById.usecase.js";
import { GetLocationsUsecase } from "./jobs/getLocations.js";
import { IsAppliedUsecase } from "./jobs/isApplied.usecase.js";
import { IsJobSavedUsecase } from "./jobs/isJobSaved.usecase.js";
import { RemoveSavedJobUsecase } from "./jobs/removeSavedJob.usecase.js";
import { SaveJobUsecase } from "./jobs/saveJob.usecase.js";
import { WithdrawAppliedUsecase } from "./jobs/withdrawApplied.usecase.js";
import { AssignRecruiterUsecase } from "./recruiter/assignRecruiter.usecase.js";
import { CreateRequestUsecase } from "./recruiter/createRequest.usecase.js";
import { GetPendingRequestsUsecase } from "./recruiter/getPendingRequests.usecase.js";
import { GetRecruiterJobsUsecase } from "./recruiter/getRecruiterJobs.usecase.js";
import { GetRecruitersUsecase } from "./recruiter/getRecruiters.usecase.js";
import { GetTotalCountUsecaseByRecruiter } from "./recruiter/getTotalCounts.usecase.js";
import { IsRecruiterUsecase } from "./recruiter/isRecruiter.usecase.js";
import { RecruiterMonthlyGraphDataUsecase } from "./recruiter/monthlyGraphData.usecase.js";
import { RejectRequestUsecase } from "./recruiter/rejectRequest.usecase.js";
import { RemoveRecruiterUsecase } from "./recruiter/removeRecruiter.usecase.js";
import { UpdateApplicantStatusUsecase } from "./recruiter/updateApplicantStatus.usecase.js";
import { RecruiterYearlyGraphDataUsecase } from "./recruiter/yearlyGraphData.usecase.js";
import { CreateUserUsecase } from "./user/createUser.usecase.js";
import { GetUserDataByEmailUsecase } from "./user/getUserDataByEmail.usecase.js";
import { GetUserDataByIdUsecase } from "./user/getUserDataById.usecase.js";
import { UpdateUserUsecase } from "./user/updateUser.usecase.js";

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

const updateCoverPhotoUsecase = new UpdateCoverPhotoUsecase(
  Repositories.CompanyRepository
);

const getJobsByAdminUsecase = new GetJobsByAdminUsecase(
  Repositories.JobRepository
);

const deleteJobsByAdminUsecase = new DeleteJobsByAdminUsecase(
  Repositories.JobRepository
);

const createRequestUsecase = new CreateRequestUsecase(
  Repositories.RecruiterRequestRepository,
  Repositories.UserRepository
);

const isRecruiterUsecase = new IsRecruiterUsecase(
  Repositories.RecruiterRequestRepository,
  Repositories.CompanyRepository,
  Repositories.UserRepository
);

const createUserUsecase = new CreateUserUsecase(Repositories.UserRepository);
const updateUserUsecase = new UpdateUserUsecase(Repositories.UserRepository);

const getRecruitersUsecase = new GetRecruitersUsecase(
  Repositories.RecruiterRequestRepository,
  Repositories.CompanyRepository
);

const getPendingRequestsUsecase = new GetPendingRequestsUsecase(
  Repositories.RecruiterRequestRepository,
  Repositories.CompanyRepository
);

const assignRecruiterUsecase = new AssignRecruiterUsecase(
  Repositories.RecruiterRequestRepository
);

const rejectRequestUsecase = new RejectRequestUsecase(
  Repositories.RecruiterRequestRepository
);

const removeRecruiterUsecase = new RemoveRecruiterUsecase(
  Repositories.RecruiterRequestRepository
);
const getRecruiterJobsUsecase = new GetRecruiterJobsUsecase(
  Repositories.JobRepository,
  Repositories.UserRepository
);

const createJobByRecruiterUsecase = new CreateJobByRecruiterUsecase(
  Repositories.JobRepository,
  Repositories.CompanyRepository,
  Repositories.UserRepository
);

const saveJobUsecase = new SaveJobUsecase(Repositories.SavedJobsRepo);
const getAllSavedJobsUsecase = new GetAllSavedJobsUsecase(
  Repositories.SavedJobsRepo
);
const removeSavedJobUsecase = new RemoveSavedJobUsecase(
  Repositories.SavedJobsRepo
);

const isJobSavedUsecase = new IsJobSavedUsecase(Repositories.SavedJobsRepo);

const applyJobUsecase = new ApplyJobUsecase(
  Repositories.AppliedJobsRepo,
  Repositories.JobRepository
);
const getAppliedJobsUsecase = new GetAppliedJobsUsecase(
  Repositories.AppliedJobsRepo
);
const withdrawAppliedUsecase = new WithdrawAppliedUsecase(
  Repositories.AppliedJobsRepo,
  Repositories.JobRepository
);
const isAppliedUsecase = new IsAppliedUsecase(Repositories.AppliedJobsRepo);
const getApplicantsUsecase = new GetApplicantsUsecase(
  Repositories.AppliedJobsRepo
);

const getTotalCountByAdminUsecase = new GetTotalCountUsecaseByAdmin(
  Repositories.JobRepository,
  Repositories.CompanyRepository,
  Repositories.UserRepository,
  Repositories.AppliedJobsRepo
);

const getTotalCountByCompanyUsecase = new GetTotalCountUsecaseByCompany(
  Repositories.JobRepository,
  Repositories.CompanyRepository,
  Repositories.AppliedJobsRepo,
  Repositories.RecruiterRequestRepository
);

const getTotalCountByRecruiterUsecase = new GetTotalCountUsecaseByRecruiter(
  Repositories.JobRepository,
  Repositories.CompanyRepository,
  Repositories.AppliedJobsRepo,
  Repositories.RecruiterRequestRepository,
  Repositories.UserRepository
);

const recruiterMonthlyGraphDataUsecase = new RecruiterMonthlyGraphDataUsecase(
  Repositories.JobRepository,
  Repositories.AppliedJobsRepo
);

const recruiterYearlyGraphDataUsecase = new RecruiterYearlyGraphDataUsecase(
  Repositories.JobRepository,
  Repositories.AppliedJobsRepo
);
const companyMonthlyGraphDataUsecase = new CompanyMonthlyGraphDataUsecase(
  Repositories.JobRepository,
  Repositories.AppliedJobsRepo
);

const companyYearlyGraphDataUsecase = new CompanyYearlyGraphDataUsecase(
  Repositories.JobRepository,
  Repositories.AppliedJobsRepo
);

const updateApplicantStatusUsecase = new UpdateApplicantStatusUsecase(
  Repositories.AppliedJobsRepo
);

const getUserDataByEmailUsecase = new GetUserDataByEmailUsecase(
  Repositories.UserRepository
);
const getUserDataByIdUsecase = new GetUserDataByIdUsecase(
  Repositories.UserRepository
);

export {
  addCategoryUsecase,
  addSkillsUsecase,
  getUserDataByEmailUsecase,
  getUserDataByIdUsecase,
  allCompaniesUsecase,
  applyJobUsecase,
  assignRecruiterUsecase,
  companyListUsecase,
  createCompanyUsecase,
  createJobByRecruiterUsecase,
  createJobUsecase,
  createRequestUsecase,
  createUserUsecase,
  deleteJobsByAdminUsecase,
  getAllCompanyJobsUsecase,
  getAllJobsUsecase,
  getAllSavedJobsUsecase,
  getApplicantsUsecase,
  getAppliedJobsUsecase,
  getCompanyDataUsecase,
  getCompanyUsecase,
  getJobByIdUsecase,
  getJobsByAdminUsecase,
  getJobsUsecase,
  getLocationsUsecase,
  getPendingRequestsUsecase,
  getRecruiterJobsUsecase,
  getRecruitersUsecase,
  getSkillsAndCategory,
  getTotalCountByAdminUsecase,
  getTotalCountByCompanyUsecase,
  getTotalCountByRecruiterUsecase,
  isAppliedUsecase,
  isJobSavedUsecase,
  isRecruiterUsecase,
  isVerifiedUsecase,
  recruiterMonthlyGraphDataUsecase,
  recruiterYearlyGraphDataUsecase,
  rejectCompanyUsecase,
  rejectRequestUsecase,
  removeCategoryUsecase,
  removeRecruiterUsecase,
  removeSavedJobUsecase,
  removeSkillUsecase,
  saveJobUsecase,
  unverifiedCompaniesUsecase,
  updateCompanyUsecase,
  updateCoverPhotoUsecase,
  updateJobUsecase,
  updateUserUsecase,
  verifiedCompaniesUsecase,
  verifyCompanyUsecase,
  withdrawAppliedUsecase,
  companyMonthlyGraphDataUsecase,
  companyYearlyGraphDataUsecase,
  updateApplicantStatusUsecase,
};
