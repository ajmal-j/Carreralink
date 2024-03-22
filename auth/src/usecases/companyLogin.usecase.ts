import { CompanyRepoType } from "../database/index.js";
import {
  IPasswordUtil,
  NotFoundError,
  UnauthorizedError,
} from "@carreralink/common";

export class CompanyLogInUsecase {
  constructor(
    private readonly passwordUtil: IPasswordUtil,
    private readonly companyRepository: CompanyRepoType
  ) {}

  async execute(companyData: { email: string; password: string }) {
    const user = await this.companyRepository.findByEmail(companyData.email);
    if (!user) throw new NotFoundError("Company not found");
    const isPasswordValid = await this.passwordUtil.comparePassword(
      companyData.password,
      user.password as string
    );
    if (!isPasswordValid) throw new UnauthorizedError("Invalid password");
    const data = {
      email: user.email,
      id: user._id,
    };
    return data;
  }
}
