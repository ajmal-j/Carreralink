import { Kafka } from "kafkajs";
import { JobUsecase } from "../../usecases/jobs/index.js";

export default async (kafka: Kafka) => {
  const consumer = kafka.consumer({ groupId: "job-application" });

  await consumer.connect();

  await consumer.subscribe({
    topic: "update-application-score",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      const application = JSON.parse(data);
      await JobUsecase.updateApplicationScore.execute({
        data: application?.data,
      });
    },
  });
};
