import { Kafka } from "kafkajs";
import { updateUserUsecase } from "../../usecases/index.js";

export default async (kafka: Kafka) => {
  const updateUserConsumer = kafka.consumer({ groupId: "user-updated" });

  await updateUserConsumer.connect();

  await updateUserConsumer.subscribe({
    topic: "user-updated",
    fromBeginning: true,
  });

  await updateUserConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      await updateUserUsecase.execute(JSON.parse(data));
    },
  });
};
