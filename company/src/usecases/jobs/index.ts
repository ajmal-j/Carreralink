import { Repositories } from "../../database/index.js";
import { HiredOneUsecase } from "./hiredOne.usecase.js";
import { UpdateStatusUsecase } from "./updateStatus.usecase.js";

const hiredOneUsecase = new HiredOneUsecase(Repositories.JobRepository);
const updateStatus = new UpdateStatusUsecase(Repositories.JobRepository);

export const JobUsecase = {
  hiredOneUsecase,
  updateStatus,
};
