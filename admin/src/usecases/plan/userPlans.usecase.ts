import { IPlanRepoType } from "../../database/index.js";

export class GetUserPlansUsecase {
  constructor(private readonly PlanRepository: IPlanRepoType) {}

  async execute() {
    return await this.PlanRepository.getUserPlans();
  }
}
