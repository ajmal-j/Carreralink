import { Kafka } from "kafkajs";
import { AiUsecases } from "../../usecases/index.js";

export default async function BuildJobAppliedConsumer(kafka: Kafka) {
  const jobAppliedConsumer = kafka.consumer({ groupId: "job-applied" });

  await jobAppliedConsumer.connect();

  await jobAppliedConsumer.subscribe({
    topic: "job-applied",
    fromBeginning: true,
  });

  await jobAppliedConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      const jobData = JSON.parse(data);
      AiUsecases.validateJobApplication.execute(jobData);
    },
  });
}
