import { kafka } from "../producer/producer.js";
import BuildCreateUserConsumer from "./createUser.consumer.js";
import BuildUpdateUserConsumer from "./updateUser.consumer.js";
import BuildPlanPurchasedConsumer from "./planPurchased.consumer.js";
import BuildUpdateApplicationScoreConsumer from "./applicationValidated.consumer.js";
import BuildUpdateAssessmentScoreConsumer from "./assessmentValidated.consumer.js";
export default async () => {
  try {
    BuildCreateUserConsumer(kafka);
    BuildUpdateUserConsumer(kafka);
    BuildPlanPurchasedConsumer(kafka);
    BuildUpdateApplicationScoreConsumer(kafka);
    BuildUpdateAssessmentScoreConsumer(kafka);
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
