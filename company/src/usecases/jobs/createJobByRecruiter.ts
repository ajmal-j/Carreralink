import { NotFoundError, UnauthorizedError } from "@carreralink/common";
import { ICompanyRepoType, IJobRepoType } from "../../database/index.js";
import { UserRepository } from "../../database/repository/user.repo.js";
import { Job } from "../../entities/job.entity.js";

export class CreateJobByRecruiterUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly UserRepository: UserRepository
  ) {}

  async execute({
    email,
    id,
    jobData,
  }: {
    email: string;
    id: string;
    jobData: any;
  }) {
    if (!jobData) throw new NotFoundError("Job data not found");
    const company = await this.CompanyRepository.findById(id);
    if (!company) throw new UnauthorizedError("Company not found");
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError("User not found");
    const data = {
      ...jobData,
      postedBy: {
        by: "recruiter",
        ref: "User",
        id: user.id,
      },
      company: company._id,
    };
    const job = new Job(data);
    const jobCreated = await this.JobRepository.create(job);
    await this.CompanyRepository.updateJobs(company.email, jobCreated._id);
    return jobCreated;
  }
}
