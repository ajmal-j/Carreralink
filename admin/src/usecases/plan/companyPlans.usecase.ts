import { IPlanRepoType } from "../../database/index.js";

export class GetCompanyPlansUsecase {
  constructor(private readonly PlanRepository: IPlanRepoType) {}

  async execute() {
    return await this.PlanRepository.getCompanyPlans();
  }
}
