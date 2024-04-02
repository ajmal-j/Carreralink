import { BadRequestError } from "@carreralink/common";
import {
  ICompanyRepoType,
  IRecruiterRequestRepoType,
} from "../../database/index.js";
import { UserRepository } from "../../database/repository/user.repo.js";

export class IsRecruiterUsecase {
  constructor(
    private readonly RecruiterRepository: IRecruiterRequestRepoType,
    private readonly CompanyRepository: ICompanyRepoType,
    private readonly UserRepository: UserRepository
  ) {}

  async execute(email: string) {
    const user = await this.UserRepository.findByEmail(email);
    if (!user) throw new BadRequestError("User not found");
    const exist = await this.RecruiterRepository.isRecruiter(user.id);
    if (!exist) throw new BadRequestError("Not a recruiter");
    return exist;
  }
}
