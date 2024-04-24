import { InternalServerError } from "@carreralink/common";
import { IPlanRepoType } from "../../database/index.js";
import { IPlan } from "../../database/models/plan.model.js";

export class CreatePlanUsecase {
  constructor(private readonly PlanRepository: IPlanRepoType) {}

  async execute(data: IPlan) {
    const created = await this.PlanRepository.create(data);
    if (!created) throw new InternalServerError("Could not create plan");
    return created;
  }
}
