import { NotFoundError } from "@carreralink/common";
import { IRecruiterRequestRepoType } from "../../database/index.js";

export class RemoveRecruiterUsecase {
  constructor(
    private readonly RecruiterRepository: IRecruiterRequestRepoType
  ) {}

  async execute({ id }: { id: string }) {
    const recruiter = await this.RecruiterRepository.delete({ id });
    if (!recruiter) throw new NotFoundError("Recruiter not found");
    return true;
  }
}
