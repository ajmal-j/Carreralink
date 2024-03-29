import { Kafka } from "kafkajs";
import { rejectCompanyUsecase } from "../usecases/index.js";

export default async (kafka: Kafka) => {
  const rejectCompanyConsumer = kafka.consumer({ groupId: "company-reject" });

  await rejectCompanyConsumer.connect();

  await rejectCompanyConsumer.subscribe({
    topic: "company-reject",
    fromBeginning: true,
  });

  await rejectCompanyConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      rejectCompanyUsecase.execute(JSON.parse(data));
    },
  });
};
