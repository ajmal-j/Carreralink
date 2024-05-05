import { Repositories } from "../../database/index.js";
import { GetCompanyPlansUsecase } from "./companyPlans.usecase.js";
import { CreatePlanUsecase } from "./create.usecase.js";
import { DeletePlanUsecase } from "./delete.js";
import { GetPlanUseCase } from "./getPlan.usecase.js";
import { UpdatePlanUsecase } from "./update.usecase.js";
import { GetUserPlansUsecase } from "./userPlans.usecase.js";

const create = new CreatePlanUsecase(Repositories.PlanRepository);
const update = new UpdatePlanUsecase(Repositories.PlanRepository);
const userPlans = new GetUserPlansUsecase(Repositories.PlanRepository);
const companyPlans = new GetCompanyPlansUsecase(Repositories.PlanRepository);
const get = new GetPlanUseCase(Repositories.PlanRepository);
const deletePlan = new DeletePlanUsecase(Repositories.PlanRepository);

export const PlanUsecase = {
  create,
  update,
  userPlans,
  companyPlans,
  get,
  deletePlan,
} as const;
