import { eventProducer } from "../events/producer/producer.js";
import {
  generateValidateApplicantPrompt,
  generateValidateAssessmentPrompt,
  generateValidateResumePrompt,
  getPdfText,
} from "../utils/index.cjs";
import { ValidateAssessment } from "./validateAssessment.js";
import { ValidateJobApplications } from "./validateJobApplications.js";
import { ValidateResumeUsecase } from "./validateResume.usecase.js";

const validateResumeUsecase = new ValidateResumeUsecase(
  getPdfText,
  generateValidateResumePrompt
);

const validateJobApplication = new ValidateJobApplications(
  getPdfText,
  generateValidateApplicantPrompt,
  eventProducer
);

const validateAssessment = new ValidateAssessment(
  generateValidateAssessmentPrompt,
  eventProducer
);

export const AiUsecases = {
  validateResumeUsecase,
  validateJobApplication,
  validateAssessment,
};
