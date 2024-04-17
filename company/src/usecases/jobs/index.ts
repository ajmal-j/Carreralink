import { Repositories } from "../../database/index.js";
import { HiredOneUsecase } from "./hiredOne.usecase.js";

const hiredOneUsecase = new HiredOneUsecase(Repositories.JobRepository);

export const JobUsecase = {
  hiredOneUsecase,
};
