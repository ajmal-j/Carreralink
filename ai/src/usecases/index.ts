import { eventProducer } from "../events/producer/producer.js";
import {
  generateValidateApplicantPrompt,
  generateValidateResumePrompt,
  getPdfText,
} from "../utils/index.cjs";
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

export const AiUsecases = {
  validateResumeUsecase,
  validateJobApplication,
};
