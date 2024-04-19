import { Repositories } from "../../database/index.js";
import { HiredOneUsecase } from "./hiredOne.usecase.js";
import { UpdateStatusUsecase } from "./updateStatus.usecase.js";
import { UpdateStatusByCompanyUsecase } from "./updateStatusByCompany.js";

const hiredOneUsecase = new HiredOneUsecase(Repositories.JobRepository);
const updateStatus = new UpdateStatusUsecase(Repositories.JobRepository);
const updateStatusByCompany = new UpdateStatusByCompanyUsecase(
  Repositories.JobRepository
);

export const JobUsecase = {
  hiredOneUsecase,
  updateStatus,
  updateStatusByCompany,
};
