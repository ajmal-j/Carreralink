import { IRecruiterRequestRepoType } from "../../database/index.js";

export class CreateRequestUsecase {
  constructor(
    private readonly RecruiterRequestRepository: IRecruiterRequestRepoType
  ) {}

  async execute(data: any) {
    return this.RecruiterRequestRepository.create(data);
  }
}
