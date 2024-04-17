import { generateValidateResumePrompt, getPdfText } from "../utils/index.cjs";
import { ValidateResumeUsecase } from "./validateResume.usecase.js";

const validateResumeUsecase = new ValidateResumeUsecase(
  getPdfText,
  generateValidateResumePrompt
);

export const AiUsecases = {
  validateResumeUsecase,
};
