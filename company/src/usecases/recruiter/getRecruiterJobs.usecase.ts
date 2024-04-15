import { NotFoundError } from "@carreralink/common";
import { IJobRepoType, IUserRepoType } from "../../database/index.js";

export class GetRecruiterJobsUsecase {
  constructor(
    private readonly JobRepository: IJobRepoType,
    private readonly UserRepository: IUserRepoType
  ) {}

  async execute({
    email,
    query,
    companyId,
  }: {
    email: string;
    query: {
      page?: number;
      q?: string;
    };
    companyId: string;
  }) {
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new NotFoundError("User not found");
    return this.JobRepository.allJobsByRecruiter({
      id: user?.id,
      query,
      companyId,
    });
  }
}
