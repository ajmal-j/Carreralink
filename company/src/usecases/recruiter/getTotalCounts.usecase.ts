import { BadRequestError, NotFoundError } from "@carreralink/common";
import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
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
  };
  recentJobs: IJobs[];
}

export class GetTotalCountUsecaseByRecruiter {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly RecruiterRepository: IRecruiterRequestRepoType,
    private readonly UserRepository: IUserRepoType
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

    const [totalJobs, totalApplied, openJobs, recentJobs] = await Promise.all([
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
    ]);

    return {
      counts: {
        totalJobs,
        totalApplied,
        openJobs,
      },
      recentJobs,
    };
  }
}
