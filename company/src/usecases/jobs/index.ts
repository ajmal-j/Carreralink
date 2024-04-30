import { Repositories } from "../../database/index.js";
import { HiredOneUsecase } from "./hiredOne.usecase.js";
import { UpdateAssessmentUsecase } from "./updateAssessment.usecase.js";
import { UpdateStatusUsecase } from "./updateStatus.usecase.js";
import { UpdateStatusByCompanyUsecase } from "./updateStatusByCompany.js";

const hiredOneUsecase = new HiredOneUsecase(Repositories.JobRepository);
const updateStatus = new UpdateStatusUsecase(Repositories.JobRepository);
const updateStatusByCompany = new UpdateStatusByCompanyUsecase(
  Repositories.JobRepository
);
const updateAssessmentUsecase = new UpdateAssessmentUsecase(
  Repositories.JobRepository
);

export const JobUsecase = {
  hiredOneUsecase,
  updateStatus,
  updateStatusByCompany,
  updateAssessmentUsecase,
};
