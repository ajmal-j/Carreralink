import { IPlanRepoType } from "../../database/index.js";

export class DeletePlanUsecase {
  constructor(private readonly PlanRepository: IPlanRepoType) {}

  async execute({ id }: { id: string }) {
    return await this.PlanRepository.delete({ id });
  }
}
