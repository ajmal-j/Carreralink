import { Kafka } from "kafkajs";
import { UserUsecases } from "../../usecases/user/index.js";

export default async (kafka: Kafka) => {
  const updateUserConsumer = kafka.consumer({
    groupId: "communication-update",
  });

  await updateUserConsumer.connect();

  await updateUserConsumer.subscribe({
    topic: "user-updated",
    fromBeginning: true,
  });

  await updateUserConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      await UserUsecases.update.execute(JSON.parse(data));
    },
  });
};
