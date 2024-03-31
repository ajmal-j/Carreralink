import { Kafka } from "kafkajs";
import { createUserUsecase } from "../../usecases/index.js";

export default async (kafka: Kafka) => {
  const createUserConsumer = kafka.consumer({ groupId: "users-company" });

  await createUserConsumer.connect();

  await createUserConsumer.subscribe({
    topic: "user-created",
    fromBeginning: true,
  });

  await createUserConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      await createUserUsecase.execute(JSON.parse(data));
    },
  });
};
