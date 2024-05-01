import { Kafka } from "kafkajs";
import { JobUsecase } from "../../usecases/jobs/index.js";

export default async (kafka: Kafka) => {
  const consumer = kafka.consumer({ groupId: "update-assessment-score" });

  await consumer.connect();

  await consumer.subscribe({
    topic: "update-assessment-score",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      try {
        const assessmentData = JSON.parse(data) as {
          data: {
            job: string;
            user: string;
            score: string;
          };
        };
        await JobUsecase.updateAssessmentScore.execute({
          data: assessmentData?.data,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
};
