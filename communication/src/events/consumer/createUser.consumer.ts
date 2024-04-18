import { Kafka } from "kafkajs";
import { UserUsecases } from "../../usecases/user/index.js";

export default async (kafka: Kafka) => {
  const createUserConsumer = kafka.consumer({
    groupId: "communication-create",
  });

  await createUserConsumer.connect();

  await createUserConsumer.subscribe({
    topic: "user-created",
    fromBeginning: true,
  });

  await createUserConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      await UserUsecases.create.execute(JSON.parse(data));
    },
  });
};
