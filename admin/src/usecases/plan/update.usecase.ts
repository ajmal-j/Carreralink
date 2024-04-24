import { NotFoundError } from "@carreralink/common";
import { IPlanRepoType } from "../../database/index.js";
import { IPlan } from "../../database/models/plan.model.js";

export class UpdatePlanUsecase {
  constructor(private readonly PlanRepository: IPlanRepoType) {}

  async execute({ data, plan }: { data: IPlan; plan: string }) {
    const updated = await this.PlanRepository.update({ data, plan });
    if (!updated) throw new NotFoundError("Plan not found");
    return updated;
  }
}
