import { kafka } from "../producer/producer.js";
import BuildJobAppliedConsumer from "./jobApplied.consumer.js";

export default async () => {
  try {
    BuildJobAppliedConsumer(kafka);
  } catch (error) {
    console.log(error);
    console.log("error connecting to kafka broker");
    process.exit(1);
  }
};
