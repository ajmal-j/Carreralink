import { Kafka } from "kafkajs";
import { IOrder } from "../../types/order.js";
import { planPurchasedUsecase } from "../../usecases/index.js";

export default async (kafka: Kafka) => {
  const planPurchasedConsumer = kafka.consumer({ groupId: "plan" });

  await planPurchasedConsumer.connect();

  await planPurchasedConsumer.subscribe({
    topic: "plan-purchased-by-company",
    fromBeginning: true,
  });

  await planPurchasedConsumer.run({
    eachMessage: async ({ message }) => {
      const data = message?.value?.toString();
      if (!data) throw new Error("No data found");
      const plan = JSON.parse(data);
      await planPurchasedUsecase.execute({
        data: plan?.order as IOrder,
      });
    },
  });
};
