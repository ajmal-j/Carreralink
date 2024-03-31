import { Kafka } from "kafkajs";
import { deleteUsersUsecase } from "../../usecases/index.js";

export default async (kafka: Kafka) => {
  const deleteUsersConsumer = kafka.consumer({ groupId: "user-delete" });

  await deleteUsersConsumer.connect();

  await deleteUsersConsumer.subscribe({
    topic: "users-delete",
    fromBeginning: true,
  });

  await deleteUsersConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) return;
      await deleteUsersUsecase.execute(JSON.parse(data));
    },
  });
};
