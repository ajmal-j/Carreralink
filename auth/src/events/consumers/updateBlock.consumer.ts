import { Kafka } from "kafkajs";
import { updateBlockUsecase } from "../../usecases/index.js";

export default async (kafka: Kafka) => {
  const updateBlockConsumer = kafka.consumer({ groupId: "user-block" });

  await updateBlockConsumer.connect();

  await updateBlockConsumer.subscribe({
    topic: "user-block",
    fromBeginning: true,
  });

  await updateBlockConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      await updateBlockUsecase.execute(JSON.parse(data));
    },
  });
};
