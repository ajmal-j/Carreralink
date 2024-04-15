import { NotFoundError } from "@carreralink/common";
import {
  IAppliedJobsRepoType,
  ICompanyRepoType,
  IJobRepoType,
  IRecruiterRequestRepoType,
} from "../../database/index.js";
import { AggregatePaginateResult } from "mongoose";
import { IJobs } from "../../database/models/jobs.model.js";

interface IDashboardData {
  counts: {
    totalJobs: number;
    openJobs: number;
    totalRecruiters: number;
    totalApplied: number;
  };
  recentJobs: AggregatePaginateResult<IJobs>;
}

export class GetTotalCountUsecaseByCompany {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly AppliedJobsRepo: IAppliedJobsRepoType,
    private readonly RecruiterRepository: IRecruiterRequestRepoType
  ) {}

  async execute(email: string): Promise<IDashboardData> {
    const company = await this.CompanyRepository.findByEmail(email);
    if (!company) throw new NotFoundError("Company not found");
    const [totalJobs, openJobs, totalRecruiters, totalApplied, recentJobs] =
      await Promise.all([
        this.JobRepository.totalJobsByCompany({
          companyId: company.id,
        }),
        this.JobRepository.totalOpenJobsByCompany({
          companyId: company.id,
        }),
        this.RecruiterRepository.totalRecruiters(company.id),
        this.AppliedJobsRepo.totalApplicantsByCompany(company.id),
        this.JobRepository.allJobs(
          {
            sort: "most recent",
          },
          company.id
        ),
      ]);
    return {
      counts: {
        totalJobs,
        openJobs,
        totalRecruiters,
        totalApplied,
      },
      recentJobs,
    };
  }
}
