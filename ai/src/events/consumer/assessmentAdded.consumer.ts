import { Kafka } from "kafkajs";
import { AiUsecases } from "../../usecases/index.js";

export default async function BuildAssessmentAddedConsumer(kafka: Kafka) {
  const consumer = kafka.consumer({ groupId: "assessment-added" });

  await consumer.connect();

  await consumer.subscribe({
    topic: "assessment-added",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      const assessmentData = JSON.parse(data);
      AiUsecases.validateAssessment.execute(assessmentData);
    },
  });
}
