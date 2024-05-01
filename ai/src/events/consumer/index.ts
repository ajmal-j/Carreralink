import { kafka } from "../producer/producer.js";
import BuildAssessmentAddedConsumer from "./assessmentAdded.consumer.js";
import BuildJobAppliedConsumer from "./jobApplied.consumer.js";

export default async () => {
  try {
    BuildJobAppliedConsumer(kafka);
    BuildAssessmentAddedConsumer(kafka);
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
