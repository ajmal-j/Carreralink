import BuildValidateResume from "./validateResume.js";

const validateResume = BuildValidateResume();

export const aiController = {
  validateResume,
};

export type IAiController = typeof aiController;
