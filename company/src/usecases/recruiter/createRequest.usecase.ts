import { BadRequestError } from "@carreralink/common";
import { IRecruiterRequestRepoType } from "../../database/index.js";
import { UserRepository } from "../../database/repository/user.repo.js";

export class CreateRequestUsecase {
  constructor(
    private readonly RecruiterRequestRepository: IRecruiterRequestRepoType,
    private readonly UserRepository: UserRepository
  ) {}

  async execute({
    email,
    ...data
  }: {
    email: string;
    company: string;
    message: string;
  }) {
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new BadRequestError("User not found");
    return this.RecruiterRequestRepository.create({
      message: data.message,
      user: user?.id,
      company: data.company,
    });
  }
}
