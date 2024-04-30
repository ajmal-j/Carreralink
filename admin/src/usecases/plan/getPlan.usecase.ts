import { NotFoundError } from "@carreralink/common";
import { IPlanRepoType } from "../../database/index.js";
import { IPlan } from "../../database/models/plan.model.js";

export class GetPlanUseCase {
  constructor(private readonly planRepository: IPlanRepoType) {}

  async execute(id: string): Promise<IPlan> {
    const plan = await this.planRepository.plan(id);
    if (!plan) throw new NotFoundError("Plan not found");
    return plan;
  }
}
