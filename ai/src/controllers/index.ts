import BuildValidateResume from "./validateResume.js";
import { eventProducer } from "../events/producer/producer.js";

const validateResume = BuildValidateResume({
  eventProducer,
});

export const aiController = {
  validateResume,
};

export type IAiController = typeof aiController;
