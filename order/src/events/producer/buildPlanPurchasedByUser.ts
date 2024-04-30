import { Producer } from "kafkajs";
import { IOrder } from "../../database/models/order.model.js";

export function buildPlanPurchasedByUserProducer(producer: Producer) {
  return async ({ order }: { order: IOrder }) => {
    await producer.send({
      topic: "plan-purchased-by-user",
      messages: [
        {
          value: JSON.stringify({ order }),
        },
      ],
    });
  };
}
