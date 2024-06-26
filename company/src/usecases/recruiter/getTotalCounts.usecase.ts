import { BadRequestError, NotFoundError } from "@carreralink/common";
import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
  IInterviewRepoType,
  IJobRepoType,
  IRecruiterRequestRepoType,
  IUserRepoType,
} from "../../database/index.js";
import { IJobs } from "../../database/models/jobs.model.js";

interface IDashboardData {
  counts: {
    totalJobs: number;
    openJobs: number;
    totalApplied: number;
    totalUpcomingInterviews: number;
  };
  recentJobs: IJobs[];
  upcomingInterviews: any[];
}

export class GetTotalCountUsecaseByRecruiter {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly RecruiterRepository: IRecruiterRequestRepoType,
    private readonly UserRepository: IUserRepoType,
    private readonly InterviewRepository: IInterviewRepoType
  ) {}

  async execute(email: string): Promise<IDashboardData> {
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new BadRequestError("User not found");
    const exist = await this.RecruiterRepository.isRecruiter(user.id);
    if (!exist?.company?.id) throw new BadRequestError("Not a recruiter");
    const company = await this.CompanyRepository.findById(
      exist.company?._id.toString()
    );
    if (!company) throw new NotFoundError("Company not found");

    const [
      totalJobs,
      totalApplied,
      openJobs,
      recentJobs,
      upcomingInterviews,
      totalUpcomingInterviews,
    ] = await Promise.all([
      this.JobRepository.totalJobsByRecruiter({
        companyId: company.id,
        userId: user.id,
      }),
      this.AppliedJobsRepo.totalApplicantsByRecruiter({
        companyId: company.id,
        userId: user.id,
      }),
      this.JobRepository.totalOpenJobsByRecruiter({
        companyId: company.id,
        userId: user.id,
      }),
      this.JobRepository.allJobsByRecruiter({
        id: user?.id,
        query: {
          sort: "most recent",
        },
        companyId: company.id,
      }),
      this.InterviewRepository.getInterviewsByRecruiter({
        interviewer: user.id,
        query: {
          p: 1,
          filter: "scheduled",
        },
      }),
      this.InterviewRepository.totalUpcomingInterviews({
        interviewer: user.id,
      }),
    ]);

    return {
      counts: {
        totalJobs,
        totalApplied,
        openJobs,
        totalUpcomingInterviews,
      },
      recentJobs,
      upcomingInterviews,
    };
  }
}
