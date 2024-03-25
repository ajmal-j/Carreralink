import { updateBlockUsecase } from "../usecases/index.js";
import { kafka } from "./producer.js";

export default async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
