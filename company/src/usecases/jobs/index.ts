import { Repositories } from "../../database/index.js";
import { ApplicationAssessmentUseCase } from "./applicationAssessment.usecase.js";
import { HiredOneUsecase } from "./hiredOne.usecase.js";
import { UpdateApplicationScore } from "./updateApplicationScore.usecase.js";
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
const updateApplicationScore = new UpdateApplicationScore(
  Repositories.AppliedJobsRepo
);
const updateApplicationAssessment = new ApplicationAssessmentUseCase(
  Repositories.AppliedJobsRepo
);

export const JobUsecase = {
  hiredOneUsecase,
  updateStatus,
  updateStatusByCompany,
  updateAssessmentUsecase,
  updateApplicationScore,
  updateApplicationAssessment,
};
